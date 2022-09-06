const express = require('express');
const ProductsDao = require('../daos/ProductsDao.js')

const routerTestProducts = express.Router();

const ProductsTest = new ProductsDao();


routerTestProducts.get('/', async (req, res) => {
    let generated_products = []
    try {
        generated_products = await ProductsTest.populate(req.query.quantity);
        res.render('products.hbs', { generated_products })        
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de items de prueba',
            error: error
        })
    }
})

module.exports = routerTestProducts
