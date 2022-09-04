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

const logoutUser = document.getElementById('logout_user')

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

logoutUser.addEventListener('click', () => {
    signOut();
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

function signOut(){
    
    const loginRoute = '/api/sessions/logout'

    fetch(loginRoute)
        .then(result => result.json())
        .then(json => theStatus = json)
        .finally(() => {
            if (theStatus.status === 'success') {
                let port = location.port;
                location.replace(`http://localhost:${port}/`)
            }
        })
        .catch(err => console.log(err));
  }
