const {knex} = require('../options/mariaDB');
const {knexSqLite} = require('../options/mySqlite3');

const createTable = async (knex) => {
  await knex.schema.createTable('productos', table =>{
    table.string('socketid').primary();
    table.string('sender');
    table.string('text');
    table.string('timehh');
  
  });
  console.log('Tabla creada')
}

//createTable(knex);
createTable(knexSqLite);