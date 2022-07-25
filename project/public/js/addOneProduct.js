import showOneProduct from './showOneProduct.js'
const addOneProduct = (addedProduct) => {
    let productId = '';
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
        const theProductId = data.theProductId;
        if (data.product[0].id === undefined){
            productId = theProductId;
        }
        else {
            productId = data.product[0].id;
        }
        alert(`Alta de producto ${ productId } exitosa`);
        showOneProduct(productId);
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);
    })
    
}

export default addOneProduct;
