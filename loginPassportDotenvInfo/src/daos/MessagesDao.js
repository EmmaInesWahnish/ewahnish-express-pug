const MemoryContainer = require('../api/MemoryContainer.js');
const generateMessage = require('../js/generateMessage.js')
const generateMessageOwner =require('../js/generateMessageOwner.js')

class MessagesDao extends MemoryContainer {
    constructor() { super()};

    populate(quantity=5) {
        this.deleteAll();
        let newMessages = [];
        for(let i=0; i < quantity; i++ ){
            this.save(generateMessage(i+1))
        }
        try {
            newMessages = this.getAll();
        } 
        catch(error){
            console.log(error);
        }

        return newMessages;
    }

    populateOwner(quantity=20) {
        this.deleteAll();
        let newMessages = [];
        for(let i=0; i < quantity; i++ ){
            this.save(generateMessageOwner(i+1))
        }
        try {
            newMessages = this.getAll();
        } 
        catch(error){
            console.log(error);
        }

        return newMessages;
    }
}

module.exports = MessagesDao