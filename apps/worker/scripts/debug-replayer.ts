import { startDebugReplayer } from '@temporalio/worker';
import {
  OpenTelemetryActivityInboundInterceptor,
  OpenTelemetryActivityOutboundInterceptor,
} from '@temporalio/interceptors-opentelemetry/lib/worker';

startDebugReplayer({
  workflowsPath: require.resolve('../../../packages/workflows/index'),
  interceptors: {
    workflowModules: [require.resolve('../../../packages/workflows/index')],
    activity: [
      (ctx) => ({
        inbound: new OpenTelemetryActivityInboundInterceptor(ctx),
        outbound: new OpenTelemetryActivityOutboundInterceptor(ctx),
      }),
    ],
  }
});