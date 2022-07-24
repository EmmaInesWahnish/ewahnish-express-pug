import express from 'express';
import ProductsDao from "../daos/products/ProductsDaoFile.js";
import envs from '../../dotenvConfig.js'

const routerProducts = express.Router();
import fs from 'fs';

const Products = new ProductsDao();

let isAdmin;

(envs.IS_ADMIN === 'true') ?  isAdmin = true : isAdmin = false;

// *** ROUTES ***
//This route returns the products list
routerProducts.get('/', async (req, res) => {
    try {
        const array = await Products.getAll();
        res.json({
            message: 'Lista de productos ',
            products: array,
            bool: isAdmin
        });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de productos',
            error: error
        })
    }
})

//This route returns a product according to its id.
routerProducts.get('/:id', async (req, res) => {
    let id = req.params.id;
    console.log("Id en routerProduct ",id)
//    if (!isNaN(id)) {
        try {
            const producto = await Products.getById(id);
            console.log("El producto ", producto)
            if (producto != undefined) {
                res.json({
                    message: 'Producto encontrado',
                    product: producto,
                    bool: isAdmin
                })
            } else {
                res.json({
                    message: "Producto no encontrado"
                })
            }
        }
        catch (error) {
            res.json({
                message: "Se produjo un error al buscar el producto",
                error: error
            })
        }
//    } 
//    else {
//        res.json({
//            "error": "El id solicitado no es numerico"
//        })
//    }
})

//This route ads a product
routerProducts.post('/', async (req, res) => {
    if (!isAdmin) {
        res.json({
            message: `Ruta ${req.path} metodo ${req.method} no autorizada`,
            error: -1
        })
    } else {
        let receive = req.body;
        let producto = [{
            timestamp: Date.now(),
            nombre: receive.nombre,
            descripcion: receive.descripcion,
            codigo: receive.codigo,
            foto: receive.foto,
            precio: receive.precio,
            stock: receive.stock
        }]
        if (producto) {
            try {
                await Products.saveArray(producto);
                try {
                    const products = await Products.getAll();
                    res.json({
                        message: "Producto incorporado",
                        product: producto,
                        bool: isAdmin,
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
    }
})

//This route updates the product with the selected id
//A property is updated only if it receives a non null value
routerProducts.put('/:id', async (req, res) => {
    if (!isAdmin) {
        res.json({
            message: `Ruta ${req.path} metodo ${req.method} no autorizada`,
            error: -1
        })
    } else {
        const id = req.params.id;
        let receive = req.body;
        console.log("The id ", id, "receive  ", receive)
        try {
            const products = await Products.getAll();
            const index = products.findIndex(element => element.id === id);
            let searchedProduct = products[index];
            console.log(index, " product.nombre ", receive.nombre);
            if (index !== -1) {

                if (receive.nombre !== null && receive.nombre !== undefined) {
                    products[index].nombre = receive.nombre;
                }
                if (receive.descripcion !== null && receive.descripcion !== undefined) {
                    products[index].descripcion = receive.descripcion;
                }
                if (receive.codigo !== null && receive.codigo !== undefined) {
                    products[index].codigo = receive.codigo;
                }
                if (receive.foto !== null && receive.foto !== undefined) {
                    products[index].foto = receive.foto;
                }
                if (receive.precio !== null && receive.precio !== undefined) {
                    products[index].precio = receive.precio;
                }
                if (receive.stock !== null && receive.stock !== undefined) {
                    products[index].stock = receive.stock;
                }

                searchedProduct = products[index];
                console.log(searchedProduct);
                //The array gets updated here
                let array = [];

                products.forEach((element) => {
                    array.push({
                        timestamp: element.timestamp,
                        nombre: element.nombre,
                        descripcion: element.descripcion,
                        codigo: element.codigo,
                        foto: element.foto,
                        precio: element.precio,
                        stock: element.stock

                    })
                })
                console.log("Array in routerProducts ", array)
                //productos.json file is replaced with the updated array
                if (envs.APIP_TYPE === "FILE") {
                    try {
                        await fs.promises.unlink('./DB/productos.json');
                        try {
                            await Products.saveArray(array);
                            res.json({
                                message: 'Modificacion exitosa',
                                product: array
                            })
                        }
                        catch (error) {
                            res.json({
                                message: 'No fue posible cargar los productos en productos.txt',
                                error: error
                            })
                        }
                    }
                    catch (error) {
                        res.json({
                            message: 'No se pudo borrar el archivo productos.txt',
                            error: error
                        })
                    }

                }
                else {
                    try {
                        await Products.modifyById(id, searchedProduct);
                        res.json({
                            message: 'Modificacion exitosa',
                            product: array
                        })
                    }
                    catch (error) {
                        res.json({
                            message: 'No fue posible modificar el producto',
                            error: error
                        })
                    }
                }
            } else {
                res.json({
                    message: 'Producto no encontrado'
                })
            }
        }
        catch (error) {
            res.json({
                message: 'Ha ocurrido un error al intentar recuperar la lista de productos',
                error: error
            })
        }
    }
})

//This route removes the product with the selected id
routerProducts.delete('/:id', async (req, res) => {
    if (!isAdmin) {
        res.json({
            message: `Ruta ${req.path} metodo ${req.method} no autorizada`,
            error: -1
        })
    } else {
        const id = req.params.id;
        console.log(id);
    //    if (!isNaN(id)) {
            try {
                const removedProduct = await Products.deleteById(id);
                if (removedProduct.length === 0) {
                    res.json({
                        message: "El producto solicitado no existe"
                    })
                } else {
                    res.json({
                        message: "El producto ha sido eliminado",
                        product: removedProduct
                    })
                }
            }
            catch (error) {
                res.json({
                    message: "El producto no pudo ser eliminado",
                    error: error
                })
            }
        //} 
        //else {
        //    res.json({
        //        message: "El id suministrado no es numerico"
        //    })
        //}
    }
})

export default routerProducts;