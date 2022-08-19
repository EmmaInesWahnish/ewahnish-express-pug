const MemoryContainer = require('../api/MemoryContainer.js');
const generateMessage = require('../js/generateMessage.js')

class MessagesDao extends MemoryContainer {
    constructor() { super()};
    
    populate(quantity=5) {
        this.deleteAll();
        console.log('in populate >>>>> 01')
        let newMessages = [];
        for(let i=0; i < quantity; i++ ){
            this.save(generateMessage())
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