/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex(`${process.env.SCHEMA}.movies`).del()
  await knex(`${process.env.SCHEMA}.movies`).insert([
    { name: 'rowValue1'},
    { name: 'rowValue2'},
    { name: 'rowValue3'}
  ]);
};
