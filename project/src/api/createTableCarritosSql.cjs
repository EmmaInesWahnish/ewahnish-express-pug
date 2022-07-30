const {knex} = require('../configurations/mariaDB.cjs');
const {knexSqLite} = require('../configurations/mySqlite3.cjs');




const createTable = async (knexSqlite) => {
  await knexSqlite.schema.createTable('carrito', table =>{
    table.increments('id').primary();
    table.string('timestamp');
    table.json('productos');
  });
  console.log('Tabla carrito creada')
}

//createTable(knex);
createTable(knexSqLite);