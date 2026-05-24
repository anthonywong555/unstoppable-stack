import { getClient } from "$lib/server/durable-execution";
import { isGrpcDeadlineError, Client } from "@temporalio/client";
import { query } from '$app/server';

export const getStatus = query(async() => {
  try {
    const client = await getClient();
    const result = await client.withDeadline(Date.now() + 100, () => client.connection.workflowService.getSystemInfo({}));
    await client.connection.close();
    return true;
  } catch(e) {
    if(isGrpcDeadlineError(e)) {
      console.error(`Deadline Exceed`);
    }
    return false;
  }
})