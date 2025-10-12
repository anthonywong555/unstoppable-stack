import { pgTable, integer, uuid, text } from "drizzle-orm/pg-core";

//Source: https://orm.drizzle.team/docs/sql-schema-declaration
export const UserSchema = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  age: integer("age").notNull(),
  email: text("email").notNull(),
});