const { knex } = require('../options/mariaDB');
const DbContainer = require('../DbContainer/DbContainer.js');

const Products = new DbContainer(knex, 'productos');

async function dbContainerDeleteById() {
    let myId = 19;
    try {

        await Products.deleteById(myId);
        return "Producto borrado";

    } catch (error) {
        console.log(error);
        return "Se produjo un error"
    }

}

const result = dbContainerDeleteById()
    .then((result) => console.log(result));