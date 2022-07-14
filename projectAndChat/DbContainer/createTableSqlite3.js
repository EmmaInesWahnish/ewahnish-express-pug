const {knex} = require('../options/mariaDB');
const {knexSqLite} = require('../options/mySqlite3');

const createTable = async (knexSqlite) => {
  await knexSqlite.schema.createTable('messages', table =>{
    table.string('socketid').primary();
    table.string('sender');
    table.string('text');
    table.string('timehh');
  
  });
  console.log('Tabla messages creada')
}

//createTable(knex);
createTable(knexSqLite);