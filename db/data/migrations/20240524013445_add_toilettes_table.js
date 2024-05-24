/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable("toilettes", (table) => {
      table.increments("id").primary();
      table.text("name");
      table.text("address");
      table.decimal("latitude", 9, 6);
      table.decimal("longitude", 9, 6);
      table.integer("m_sum");
      table.integer("w_sum");
      table.integer("uni_sum");
      table.integer("multi_toilet");
      table.boolean("wheelchair");
      table.boolean("babies");
      table.boolean("ostomate");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("toilettes");
  };
  