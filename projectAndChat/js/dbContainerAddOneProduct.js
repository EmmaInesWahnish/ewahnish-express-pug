const { knex } = require('../options/mariaDB');
const DbContainer = require('../DbContainer/DbContainer.js');

const Products = new DbContainer(knex, 'productos');

async function dbContainerAddOneProduct() {

    let item =     {
        title: "Locro",
        thumbnail: "/images/locro.png",
        price: 350
    }

    try {

        await Products.save(item);
        return "Producto agregado";

    } catch (error) {
        console.log(error);
        return "Se produjo un error"
    }

}

const result = dbContainerAddOneProduct();
console.log(result);