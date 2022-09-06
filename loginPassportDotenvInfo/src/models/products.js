const mongoose = require("mongoose");
const { Schema, model } = mongoose

const productCollection = 'productos';

const ProductSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
})

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true
});

const ProductModel = model(productCollection, ProductSchema)

module.exports =  ProductModel;