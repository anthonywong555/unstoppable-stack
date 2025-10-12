import { DrizzleClient } from "./client";

export function createDrizzleActivites(drizzleClient: DrizzleClient) {
  return {
    sql: drizzleClient.sql.bind(drizzleClient),
  }
}