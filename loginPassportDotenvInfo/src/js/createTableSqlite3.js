const {knex} = require('../options/mariaDB');
const {knexSqLite} = require('../options/mySqlite3');

const createTable = async (knexSqlite) => {
  await knexSqlite.schema.createTable('messages', table =>{
    table.increments('id').primary();
    table.string('sender');
    table.string('socketid');
    table.string('text');
    table.string('timehh')
  });
  console.log('Tabla messages creada')
}

//createTable(knex);
createTable(knexSqLite);