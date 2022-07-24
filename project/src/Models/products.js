import mongoose from "mongoose";
const {Schema, model} = mongoose

const productCollection = 'productos';

const ProductSchema = new Schema({
    timestamp:{type: Date, required: true},
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true, max: 100},
    foto: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
})

const ProductModel = model(productCollection, ProductSchema)

export default ProductModel;