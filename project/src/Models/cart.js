import mongoose from "mongoose";
const { Schema, model } = mongoose

const cartCollection = 'carrito';

const CartSchema = new Schema({
    timestamp: { type: Date, required: true },
    productos: [{
        _id: { type: String, required: true},
        timestamp: { type: Date, required: true },
        nombre: { type: String, required: true, max: 100 },
        descripcion: { type: String, required: true, max: 100 },
        codigo: { type: String, required: true, max: 100 },
        foto: { type: String, required: true },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
        cantidad: {type: Number, required: true}
    }]
})

const CartModel = model(cartCollection, CartSchema)

export default CartModel;