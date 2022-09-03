import renderProducts from './renderProducts.js';

import renderModalOneCart from './renderModalOneCart.js';

import renderHome from './renderHome.js'

import renderNewProductForm from './renderNewProductForm.js';

import renderModalOneProduct from './renderModalOneProduct.js';

import renderModalDeleteCart from './renderModalDeleteCart.js'

const listProducts = document.getElementById('listProducts');

const createProduct = document.getElementById('createProduct');

const productDetail = document.getElementById('productDetail');

const deleteCart = document.getElementById('deleteCart');

const listCart =document.getElementById('listCart');

const homePage = document.getElementById('home');

listProducts.addEventListener('click', () => {
    renderProducts();
});

homePage.addEventListener('click', () => {
    renderHome();
});

createProduct.addEventListener('click', () => {
    renderNewProductForm();
});

productDetail.addEventListener('click', () => {
    renderModalOneProduct()
}) 

deleteCart.addEventListener('click', () => {
    renderModalDeleteCart()
}) 

listCart.addEventListener('click', () => {
    renderModalOneCart()
}) 