const {knex} = require('../configurations/mariaDB.cjs');
const {knexSqLite} = require('../configurations/mySqlite3.cjs');




const createTable = async (knex) => {
  await knex.schema.createTable('carrito', table =>{
    table.increments('id').primary();
    table.string('timestamp');
    table.json('productos').nullable();
  });
  console.log('Tabla carrito creada')
}

//createTable(knex);
createTable(knex);