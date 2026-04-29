import { bundleWorkflowCode } from '@temporalio/worker';
import { writeFile } from 'fs/promises';
import { OpenTelemetryPlugin } from '@temporalio/interceptors-opentelemetry';
import { resource, spanProcessor } from '../src/instrumentation';
import path from 'path';

async function bundle() {
  const plugins = spanProcessor ? [new OpenTelemetryPlugin({ resource, spanProcessor })] : [];

  const { code } = await bundleWorkflowCode({
    workflowsPath: require.resolve('@boilerplate/workflows/worker-a'),
    plugins    
  });
  const codePath = path.join(__dirname, '../workflow-bundle.js');

  await writeFile(codePath, code);
  console.log(`Bundle written to ${codePath}`);
}

bundle().catch((err) => {
  console.error(err);
  process.exit(1);
});
