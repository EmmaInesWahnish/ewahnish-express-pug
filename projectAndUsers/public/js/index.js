import renderProducts from './renderProducts.js';

import renderModalOneCart from './renderModalOneCart.js';

import renderHome from './renderHome.js'

import renderNewProductForm from './renderNewProductForm.js';

import renderLoginForm from './renderLoginForm.js';

import renderRegisterForm from './renderRegisterForm.js'

import renderModalOneProduct from './renderModalOneProduct.js';

import renderModalDeleteCart from './renderModalDeleteCart.js'

const listProducts = document.getElementById('listProducts');

const createProduct = document.getElementById('createProduct');

const newLogin = document.getElementById('login_user');

const newRegister = document.getElementById('register_user');

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

newLogin.addEventListener('click', () => {
    renderLoginForm();
});

newRegister.addEventListener('click', () => {
    renderRegisterForm();
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