import express from 'express';
import AnyContainer from "../api/Container.js";

const routerCart = express.Router();
const Cart = new AnyContainer('./files/carrito.txt');
// *** ROUTES ***
//This route returns all carts
routerCart.get('/', async (req, res) => {
    try {
        const array = await Cart.getAll();
        res.json({ message: 'Carritos ', carrito: array });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de carritos',
            error: error
        })
    }
})

//This route returns a cart according to its id.
routerCart.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id)) {
        try {
            const carrito = await Cart.getById(id);
            if (carrito != undefined) {
                res.json({
                    message: 'carrito encontrado',
                    id: carrito.id,
                    timestamp: carrito.timestamp,
                    productos: carrito.productos
                })
            } else {
                res.json({
                    message: "carrito no encontrado"
                })
            }
        }
        catch (error) {
            res.json({
                message: "Se produjo un error al buscar el carrito",
                error: error
            })
        }
    } else {
        res.json({
            "error": "El id solicitado no es numerico"
        })
    }
})

//This route ads an empty cart
routerCart.post('/', async (req, res) => {
    let receive = req.body;
    let carrito = [{
        timestamp: receive.timestamp,
        productos: receive.productos,
    }]
    if (carrito) {
        try {
            await Cart.saveArray(carrito);
            try {
                const carrito = await Cart.getAll();
                const cartId = carrito[carrito.length - 1].id;
                res.json({
                    message: "Carrito incorporado",
                    carrito: carrito,
                    cartId: cartId
                })
            }
            catch (error) {
                res.json({
                    message: 'No se ha podido obtener la lista de productos',
                    error: error
                })
            }
        }
        catch (error) {
            res.json({
                message: 'No se ha podido guardar el producto',
                error: error
            })
        }
    } else {
        res.json({
            message: "Los datos suministrados son incorrectos"
        })
    }

})

//This route updates the cart with the selected id
//A product is added to the cart with id :id
routerCart.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    let indexc = 0
    let indexp = 0
    let receive = req.body;
    let searchedCart = [];
    let carts = [];
    let modifiedCart = [];
    try {
        carts = await Cart.getAll();
        indexc = carts.findIndex(element => element.id === id);
        if (indexc !== -1) {
            searchedCart = carts[indexc];
            let cartId = searchedCart.id;
            let cartTimestamp = searchedCart.timestamp;
            const productArray = searchedCart.productos;
            console.log("Productos .1 ", productArray)
            indexp = productArray.findIndex(element => element.id === receive.id);
            console.log(indexp)
            if (indexp !== -1) {
                carts[indexc].productos[indexp].cantidad = carts[indexc].productos[indexp].cantidad + receive.cantidad;
                modifiedProduct = carts[indexc];
            }
            else {
                console.log("recibo ", receive)
                productArray.push(receive);
                modifiedCart = {
                    id: cartId,
                    timestamp: cartTimestamp,
                    productos: productArray
                }
            }
            try {
                await Cart.modifyById(cartId, modifiedCart);
                res.json({
                    message: 'Modificacion exitosa',
                    product: modifiedCart
                })
            }
            catch (error) {
                res.json({
                    message: 'No fue posible cargar los productos en productos.txt',
                    error: error
                })
            }
        }
        else {
            res.json({
                message: 'Carrito no encontrado',
            })
        }
    }
    catch (error) {
        res.json({
            message: 'Ha ocurrido un error al intentar recuperar la lista de carritos',
            error: error
        })
    }
})

routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod)
    try {
        const carts = await Cart.getAll();
        const indexc = carts.findIndex(element => element.id === id);
        const searchedCart = carts[indexc];
        const productArray = searchedCart.productos;
        if (indexc !== -1) {
            const indexp = productArray.findIndex(element => element.id === id_prod);
            if (indexp !== -1) {
                try {
                    await Cart.deleteProdById(id, id_prod);
                    res.json({
                        message: 'Eliminacion exitosa',
                    })
                }
                catch (error) {
                    res.json({
                        message: 'No fue posible eliminar el producto del carrito',
                        error: error
                    })
                }                   

            } else {
                res.json({
                    message: 'el producto no se encuentra en el carrito'
                })
            }
            res.json({
                message: 'carrito no encontrado'
            })
        }
    }
    catch (error) {

    }

})

//This route removes the cart with the selected id
routerCart.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id)) {
        try {
            const removedCart = await Cart.deleteById(id);
            let howManyProducts = Cart.productos.length;

            if (removedCart.length === 0) {
                res.json({
                    message: "El carrito solicitado no existe"
                })
            } else {
                res.json({
                    message: "El carrito ha sido eliminado",
                    product: removedCart
                })
            }
        }
        catch (error) {
            res.json({
                message: "El carrito no pudo ser eliminado",
                error: error
            })
        }
    } else {
        res.json({
            message: "El id suministrado no es numerico"
        })
    }
})

export default routerCart;