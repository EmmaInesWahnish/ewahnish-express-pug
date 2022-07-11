import renderHome from './renderHome.js';

const renderProducts = (productId) => {
    let quantity = [];
    quantity[productId] = 0

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

    const productRoute = `http://localhost:8080/api/productos/${productId}`

    console.log(productRoute);

    fetch(productRoute)
        .then(res => res.json())
        .then(data => {
            if (data.message === "Producto no encontrado") {
                alert("Producto no encontrado");
                renderHome();
            } else {
                let product = data.product
                const cardContainer = document.getElementById('oneProduct')

                const cards = document.createElement('div');

                cards.setAttribute('class', 'flex-container-card')

                cards.innerHTML = `<div>
                                    <div id=${product.id} class="card-header center" width="300px" >
                                        <h3>${product.id} ${product.codigo}</h3>
                                        <h3><i>${product.nombre}</i></h3> 
                                        <h3>${product.descripcion}</h3>
                                        <h3>Precio: ${product.precio}</h3>
                                        <h3>Stock: ${product.stock}</h3>
                                        <div class"pictures">
                                            <img src='${product.foto}'
                                        <div>     
                                    </div>
                                    <div id=${product.id}></div>`

                cardContainer.appendChild(cards);
            }
        })
        .catch(err => console.log(err))
}

export default renderProducts;
