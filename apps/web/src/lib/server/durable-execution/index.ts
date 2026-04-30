import { env } from "$env/dynamic/private";
import { connectToTemporal } from "@boilerplate/durable-execution/connection";
import { isGrpcDeadlineError, Client } from "@temporalio/client";

let client: Client;

export async function getClient() {
  client = await connectToTemporal(env);
  return client;
}