import { env } from "$env/dynamic/private";
import { connectToTemporal } from "@boilerplate/durable-execution/connection";
import { isGrpcDeadlineError, Client } from "@temporalio/client";

let client: Client;

export async function getClient() {
  client = await connectToTemporal(env);
  return client;
}

export async function getStatus() {
  try {
    const client = await getClient();
    const result = await client.withDeadline(Date.now() + 100, () => client.connection.workflowService.getSystemInfo({}));
    console.log(result);
    await client.connection.close();
    return true;
  } catch(e) {
    if(isGrpcDeadlineError(e)) {
      console.error(`Deadline Exceed`);
    }
    return false;
  }
}