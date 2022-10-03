
import mongoose from 'mongoose';
import config from '../configurations/dotenvConfig.js'
import MessageModel from '../models/messages.js';
import MongoDbContainer from '../api/MongoDbContainer.js';

const URL = config.envs.URL.toString();
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