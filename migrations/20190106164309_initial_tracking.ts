import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable("pull_requests", t => {
      t.increments("id")
        .unsigned()
        .primary();
      t.string("link").notNullable();
      t.string("slack_user").notNullable();
      t.string("state").notNullable();
      t.timestamps();
    })
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable("pull_requests")]);
}
