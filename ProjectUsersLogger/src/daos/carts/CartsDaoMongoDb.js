
import mongoose from 'mongoose';
import config from '../../configurations/dotenvConfig.js'
import CartModel from "../../../src/Models/cart.js";
import MongoDbContainer from '../../api/MongoDbContainer.js';

const URL = config.envs.URL.toString();
const TheModel = CartModel;

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

connectToDb();

connectToDb();

class CartsDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.connectToDb = connectToDb;
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

export default CartsDaoMongoDb;