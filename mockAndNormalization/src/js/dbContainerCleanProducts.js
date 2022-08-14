const { knex } = require('../options/mariaDB');
const DbContainer = require('../DbContainer/DbContainer.js');

const Products = new DbContainer(knex, 'productos');

async function anyContainerClean() {

    await Products.deleteAll()
    
}

module.exports = anyContainerClean;
