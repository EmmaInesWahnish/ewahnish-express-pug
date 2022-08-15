
const mongoose = require('mongoose');
const envs = require('../../dotenvConfig.js')
const ChatModel = require("../../../src/Models/products.js");
const MongoDbContainer = require('../api/MongoDbContainer.js');

const URL = envs.URL.toString();
const TheModel = ChatModel;

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

class ChatDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.connectToDb = connectToDb;
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

module.exports = ChatDaoMongoDb;