const {knex} = require('../options/mariaDB');
const {knexSqLite} = require('../options/mySqlite3');

const dropTable = async (knexSqlite) => {
    await knexSqlite.schema.dropTable('messages');
    console.log('Tabla messages eliminada')
  }
  
  //createTable(knex);
  dropTable(knexSqLite);