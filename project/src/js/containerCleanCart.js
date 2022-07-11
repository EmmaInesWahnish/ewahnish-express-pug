import AnyContainer from '../api/Container.js';

const Products = new AnyContainer('./files/carrito.txt');

console.log(Products)

async function anyContainerClean() {

    await Products.deleteAll()
    
}

module.exports = anyContainerClean;
