import { log, proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function example(name: string): Promise<string> {
  const greeting = await greet(name);
  log.info('Greeted', { greeting });
  return greeting;
}
