import renderModalModifyProduct from './renderModalModifyProduct.js';
import renderModalDeleteProduct from './renderModalDeleteProduct.js';
import renderModalAddToCart from './renderModalAddToCart.js';
import renderModalDeleteFromCart from './renderModalDeleteFromCart.js';
import createACart from './createACart.js';
import addToQuantity from './addToQuantity.js';
import subtractFromQuantity from './subtractFromQuantity.js'
import showOneProduct from './showOneProduct.js'
import findQobject from './findQobject.js'

let array = [];

//element.parentNode.removeChild(element);
const renderProducts = () => {
    let qobject = [{}];
    let cartId = '';
    let cart = [];

    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myCart').innerText = "";
    document.getElementById('productsInCart').innerHTML = "";

    const homePage = document.getElementById("homePage")

    let show = function (elem) {
        elem.style.display = 'block';
    };
    let hide = function (elem) {
        elem.style.display = 'none';
    };

    hide(homePage)


    fetch('http://localhost:8080/api/productos')
        .then(res => res.json())
        .then(data => {
            
            let whichDb = data.whichDb;

            document.getElementById('productCards').innerHTML = "";

            const cardContainer = document.getElementById('productCards')
            for (let product of data.products) {
                array.push(product)
                qobject.push({
                    value: 0,
                    id: product.id
                });
                let pictureId = "PIC" + product.id;
                const cards = document.createElement('div');

                cards.setAttribute('class', 'flex-container-card')

                cards.innerHTML = `<div id=${product.id} class="card-header center big_id" width="300px" >
                                        <h6>${product.id}</h6>
                                        <h6>${product.codigo}</h6>
                                        <h6><i>${product.nombre}</i></h6> 
                                        <h6>${product.descripcion}</h6>
                                        <h6>Precio: ${product.precio}</h6>
                                        <h6>Stock: ${product.stock}</h6>
                                        <div id=${pictureId} class="pictures">
                                            <img src='${product.foto}'>     
                                        </div>
                                   <div>`

                cardContainer.appendChild(cards);

                let theId = `${product.id}`;

                const cardButtons = document.getElementById(theId);

                const buttons = document.createElement('div');

                if (data.bool) {
                    buttons.innerHTML = `<div class="flex-container-button-group card-footer">
                                        <button style="width:200px" 
                                                id=U${product.id} 
                                                class="btn btn-primary btn-sm">
                                                    Modificacion de Producto
                                        </button>                    
                                        <button style="width:200px" 
                                                id=D${product.id}
                                                class="btn btn-danger btn-sm">
                                                    Eliminacion de Producto
                                        </button>
                                        <div>`;

                    cardButtons.appendChild(buttons)

                    let productId = `U${product.id}`

                    let formModifyProduct = document.getElementById(productId);

                    formModifyProduct.addEventListener('click', function () {

                        renderModalModifyProduct(product);

                    })

                    let dproductId = `D${product.id}`

                    let formDeleteProduct = document.getElementById(dproductId);

                    formDeleteProduct.addEventListener('click', function () {

                        let i = findQobject(qobject, product.id);

                        let quantity = qobject[i].value;

                        renderModalDeleteProduct(product, quantity);

                    })

                } else {

                    let activeCart = document.getElementById("activeCart")

                    activeCart.innerHTML = `No hay carrito activo`

                    let i = findQobject(qobject, product.id);

                    let quantity = qobject[i].value;

                    buttons.innerHTML = `<div class="flex-container-button-group card-footer">
                                        <div class="flex-container-buttons  p-0 m-0 bg-light" style="width:200px height=25px">
                                            <button id=A${product.id}
                                                    class="btn btn-light p-0 m-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="grey" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
</svg>
                                            </button>
                                            <div id=Q${product.id} class="flex-item"><span> ${quantity} </span></div>
                                            <button id=S${product.id}
                                                    class="btn btn-light  p-0 m-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" fill="grey" class="bi bi-dash-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
</svg>
                                            </button>
                                        </div>                                
                                        <button 
                                                id=M${product.id} 
                                                class="btn btn-success" style="width:200px">
                                                    Agregar al carrito
                                        </button>
                                        <button 
                                                id=C${product.id} 
                                                class="btn btn-danger" style="width:200px">
                                                    Eliminar del carrito
                                        </button>
                                        </div>`;


                    cardButtons.appendChild(buttons)

                    let cartNumber = document.getElementById("cartNumber")

                    let mButtonId = `M${product.id}`

                    let addProductToCart = document.getElementById(mButtonId);

                    addProductToCart.addEventListener('click', function () {

                        let i = findQobject(qobject, product.id);

                        let quantity = qobject[i].value;

                        let cartId = cartNumber.innerText

                        if (cartId === '') {
                            let cart;
                            if ((whichDb === 'MARIADB') || (whichDb === 'SQL')) {
                                cart = {
                                    timestamp: Date.now(),
                                    productos: null,
                                }
                            }
                            else {
                                cart = {
                                    timestamp: Date.now(),
                                    productos: [],
                                }
                            }

                            cartId = createACart(cart, quantity, product);

                            let cartNumber = document.getElementById("cartNumber")

                            cartId = cartNumber.innerText

                        } else {
                            cartId = cartNumber.innerText
                            renderModalAddToCart(product, quantity, cartId);
                        }

                    })

                    let dButtonId = `C${product.id}`

                    let productId = `${product.id}`

                    let deleteProductFromCart = document.getElementById(dButtonId);

                    deleteProductFromCart.addEventListener('click', function () {

                        let cartId2 = cartNumber.innerText

                        if (cartId2 === '') {
                            alert(`Aun no se ha habilitado ningun carrito`);
                        } else {
                            renderModalDeleteFromCart(productId, cartId2);
                        }
                    })

                    let aButtonId = `A${product.id}`

                    let add = document.getElementById(aButtonId);

                    add.addEventListener('click', function () {
                        let i = findQobject(qobject, product.id);
                        qobject[i].value = addToQuantity(qobject[i].value, product);
                    })

                    let sButtonId = `S${product.id}`

                    let subtract = document.getElementById(sButtonId);

                    subtract.addEventListener('click', function () {
                        let i = findQobject(qobject, product.id);
                        qobject[i].value = subtractFromQuantity(qobject[i].value, product);
                    })

                }
                let showOneProductId = `${pictureId}`

                let oneProduct = document.getElementById(showOneProductId);

                oneProduct.addEventListener('click', function () {

                    showOneProduct(product.id);

                })

            }
        })
        .catch(err => console.log(err))
}

export default renderProducts;
