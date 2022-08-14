const express = require('express');
const ProductsDao = require('../daos/ProductsDao.js')

const routerTestProducts = express.Router();

const ProductsTest = new ProductsDao();


routerTestProducts.get('/', async (req, res) => {
    let generated_products = []
    try {
        generated_products = await ProductsTest.populate(req.query.cant);
        console.log(generated_products);
        res.render('products.hbs', { generated_products })
    }

    catch (error) {
        console.log(error)
    }
})

module.exports = routerTestProducts
