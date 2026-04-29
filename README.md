# temporal-typescript-production

This document meant to show you the roadmap on how to "productionize" your Temporal Worker for TS. 

## Recommended

### Bundle Workflow

If you prebundle your Workflow Code then this would reduce Worker startup time.

- [Workflow Options](https://github.com/temporalio/samples-typescript/blob/main/production/src/worker.ts#L5)
- [Bundle Scripts](https://github.com/temporalio/samples-typescript/blob/main/production/src/scripts/build-workflow-bundle.ts)

### Metrics, Tracing, and Logs

- [OpenTelemetry](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry)
  - [package.json](https://github.com/temporalio/samples-typescript/blob/main/interceptors-opentelemetry/package.json)
  - [instrumentation.ts](https://github.com/temporalio/samples-typescript/blob/main/interceptors-opentelemetry/src/instrumentation.ts)
  - [worker.ts - otelSdk.shutdown();](https://github.com/temporalio/samples-typescript/blob/main/interceptors-opentelemetry/src/worker.ts#L93)

### Distributed Tracing

- [OpenTelemetryWorkflowClientInterceptor](https://github.com/temporalio/sdk-typescript/blob/42b16641ef2ad4afd81afd45de15cb9a2c10aff2/packages/interceptors-opentelemetry/src/plugin.ts#L36)
- [Example](https://github.com/anthonywong555/temporal-grocery-search-deals/blob/946fd400ab97825e04d00e32279f48cca49bb404/packages/temporal/connection/index.ts#L69)

### Health Check

- [healthService.check](https://github.com/temporalio/sdk-typescript/blob/main/packages/test/src/test-client-connection.ts#L224C32-L224C50)
  - [withOptionalStatusServer](https://github.com/temporalio/sdk-typescript/blob/42b16641ef2ad4afd81afd45de15cb9a2c10aff2/packages/test/src/load/worker.ts#L173)

### VSCode

- [Debugger](https://marketplace.visualstudio.com/items?itemName=temporal-technologies.temporalio)

## Optional

## Custom Logger

- [Winston](https://github.com/temporalio/samples-typescript/tree/main/custom-logger)
 
## Sentry

- [OpenTelemetry](https://github.com/getsentry/sentry-javascript/tree/develop/packages/opentelemetry)
  - [SvelteKit](https://github.com/getsentry/sentry-javascript/tree/develop/packages/sveltekit)
