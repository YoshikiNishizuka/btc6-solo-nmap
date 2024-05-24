/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const toilettesJSON = require("./data/public_toilettes.json");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('toilettes').del()
  .then(()=> {
    return knex("toilettes").insert(toilettesJSON)
  });
};
