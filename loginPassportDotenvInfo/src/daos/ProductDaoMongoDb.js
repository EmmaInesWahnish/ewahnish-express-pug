
const mongoose = require('mongoose');
const config = require('../config/dotenvConfig.js')
const ProductModel = require("../models/products.js");
const MongoDbContainer = require('../api/MongoDbContainer.js');

const URL = config.envs.URL.toString();
const TheModel = ProductModel;

const connectToDb = async () => {
    try {
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Estado de la conexion ", mongoose.connection.readyState);
    } catch (error) {
        console.error("DB Error: ", error);
    }
}

class ProductsDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.connectToDb = connectToDb;
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

module.exports = ProductsDaoMongoDb;