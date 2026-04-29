import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SpanProcessor, SpanExporter, BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { MetricReader, PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

function setupTraceExporter(): SpanExporter | undefined {
  return new ConsoleSpanExporter();
}

function setupMetricReader(): MetricReader | undefined {
  return new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  });
}

export const resource = new Resource({
  [ATTR_SERVICE_NAME]: 'interceptors-sample',
});

const traceExporter = setupTraceExporter();

export const spanProcessor: SpanProcessor | undefined = traceExporter
  ? new BatchSpanProcessor(traceExporter)
  : undefined;

const metricReader = setupMetricReader();

export function setupOtelSdk(): NodeSDK {
  const otelSdk = new NodeSDK({
    resource,
    spanProcessors: spanProcessor ? [spanProcessor] : [],
    metricReader,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  otelSdk.start();
  return otelSdk;
}