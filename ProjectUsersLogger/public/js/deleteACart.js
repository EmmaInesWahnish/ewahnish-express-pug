const deleteACart = (cartId) => {
    const productRoute = `/api/carrito/${cartId}`

    console.log(productRoute);

    fetch(productRoute)
        .then(res => res.json())
        .then(data => {
            let howMany = data.productos.length;
            if (howMany <= 0) {
                fetch(productRoute, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(async res => {

                        await res.json();

                    })
                    .catch(err => console.log(err))
            }
            for (let product of data.productos) {
                const productId = product.id;

                const productRouteTwo = `http://localhost:8080/api/carrito/${cartId}/productos/${productId}`

                console.log(productRouteTwo);

                fetch(productRouteTwo, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(async res => {

                        const data = await res.json();
                        fetch(productRoute, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(async res => {

                                await res.json();

                            })
                            .catch(err => console.log(err))


                    })
                    .catch(err => console.log(err))
            }
        })
}

export default deleteACart;
