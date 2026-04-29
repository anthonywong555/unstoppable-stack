import http from 'node:http';
import { DefaultLogger, Worker, Runtime, makeTelemetryFilterString, LogLevel, NativeConnection } from '@temporalio/worker';
import { OpenTelemetryPlugin } from '@temporalio/interceptors-opentelemetry';
import * as activities from './activities';
import { setupOtelSdk, resource, spanProcessor } from './instrumentation';
import { createLogger } from './logging';


const winstonLogger = createLogger({
  isProduction: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preview',
  logFilePath: process.env.WORKER_LOG_PATH || '/var/log/worker.log',
});

function initializeRuntime() {
  const LOG_LEVEL = process.env.LOG_LEVEL as LogLevel || 'WARN';

  Runtime.install({
    logger: new DefaultLogger(LOG_LEVEL, (entry) => {
      winstonLogger.log({
        label: entry.meta?.activityId ? 'activity' : entry.meta?.workflowId ? 'workflow' : 'worker',
        level: entry.level.toLowerCase(),
        message: entry.message,
        timestamp: Number(entry.timestampNanos / 1_000_000n),
        ...entry.meta,
      });
    }),
    telemetryOptions: {
      logging: {
        forward: {},
        filter: makeTelemetryFilterString({ core: LOG_LEVEL, other: LOG_LEVEL }),
      },
    },
  });
}

// Copied from: https://github.com/temporalio/sdk-typescript/blob/6aed8bd095bac9f0c85ba9e149c8f595e53c43e1/packages/test/src/load/worker.ts#L46
async function withOptionalStatusServer(
  worker: Worker,
  port: number | undefined,
  fn: () => Promise<any>
): Promise<void> {
  if (port == null) {
    await fn();
    return;
  }

  const server = await new Promise<http.Server>((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (req.method !== 'GET') {
        res.writeHead(405, 'Method not allowed');
        res.end();
        return;
      }
      if (req.url !== '/') {
        res.writeHead(404, 'Not found');
        res.end();
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(worker.getStatus()));
      res.end();
    });
    server.listen(port, () => resolve(server));
    server.once('error', reject);
  });
  console.log('Status server listening on', server?.address());
  try {
    await fn();
  } finally {
    server.close();
  }
}

async function main() {
  const otelSdk = setupOtelSdk();
  initializeRuntime();

  const plugins = spanProcessor ? [new OpenTelemetryPlugin({ resource, spanProcessor })] : [];

  const workflowOption = () =>
  process.env.NODE_ENV === 'production'
    ? {
        workflowBundle: {
          codePath: require.resolve('../workflow-bundle.js'),
        },
        plugins
      }
    : { workflowsPath: require.resolve('./workflows'), plugins };

  const connection = await NativeConnection.connect({});

  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    taskQueue: 'production-sample',
  });

  await withOptionalStatusServer(worker, 2733, async() => {
    try {
      await worker.run();
    } finally {
      await otelSdk.shutdown();
      await connection.close();
    }
  })
}

main().then(
  () => void process.exit(0),
  (err) => {
    winstonLogger.error('Process failed', err);
    process.exit(1);
  },
);