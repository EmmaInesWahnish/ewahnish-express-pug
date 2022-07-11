import showOneProduct from './showOneProduct.js'
const addOneProduct = (addedProduct) => {

    const productRoute = `http://localhost:8080/api/productos/`

    const requestOptions = {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(addedProduct),
    };

    fetch(productRoute, requestOptions)
    .then(async res => {
        const data = await res.json();
        console.log(data);
        alert(`Alta de producto ${data.product[0].id} exitosa`);
        let productId = data.product[0].id;
        showOneProduct(productId);
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);
    })
    
}

export default addOneProduct;
