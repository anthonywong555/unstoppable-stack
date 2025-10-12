import { drizzleZeroConfig } from "drizzle-zero";
import * as drizzleSchema from "@boilerplate/database";

// See: https://github.com/0xcadams/drizzle-zero?tab=readme-ov-file#customize-with-drizzle-zeroconfigts

export const schema = drizzleZeroConfig(drizzleSchema, {
  tables: {
    UserSchema: {
      id: true,
      name: true,
      age: true,
      email: true
    }
  },
  casing: "snake_case"
})
