const { knex } = require('../options/mariaDB');
const DbContainer = require('../DbContainer/DbContainer.js');

const Products = new DbContainer(knex, 'productos');

async function dbContainerModifyOneProduct() {

    let myId = 34;

    let myJson =     {
        title: "Carne a la Olla con cebolla, zanahoria y zapallo",
    }

    try {

        await Products.modifyById(myId, myJson);
        return "Producto modificado";

    } catch (error) {
        console.log(error);
        return "Se produjo un error"
    }

}

const result = dbContainerModifyOneProduct();
console.log(result);