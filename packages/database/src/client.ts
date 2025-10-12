import { drizzle, NodePgClient, NodePgDatabase } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";

export class DrizzleClient {
  db: NodePgDatabase<Record<string, never>> & {
    $client: NodePgClient;
  };

  constructor(databaseURL: string) {
    this.db = drizzle(databaseURL);
  }

  async sql(sqlQuery: string) {
    return await this.db.execute(sql.raw(sqlQuery));
  }
}