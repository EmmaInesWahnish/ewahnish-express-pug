
import mongoose from 'mongoose';
import envs from '../../dotenvConfig.js'
import MessageModel from '../Models/messages.js';
import MongoDbContainer from '../api/MongoDbContainer.js';

const URL = envs.URL.toString();
const TheModel = MessageModel;

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

export default ChatDaoMongoDb;