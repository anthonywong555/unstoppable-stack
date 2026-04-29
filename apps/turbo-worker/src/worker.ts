import { DefaultLogger, Worker, Runtime, makeTelemetryFilterString, LogLevel } from '@temporalio/worker';
import * as activities from '@boilerplate/activities/example';
import { OpenTelemetryPlugin } from '@temporalio/interceptors-opentelemetry';
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
    : { workflowsPath: require.resolve('@boilerplate/workflows/worker-a'), plugins };

  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    taskQueue: 'production-sample',
  });

  try {
    await worker.run();
  } finally {
    await otelSdk.shutdown();
  }
}

main().then(
  () => void process.exit(0),
  (err) => {
    winstonLogger.error('Process failed', err);
    process.exit(1);
  },
);
