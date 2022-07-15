const {knexSqLite} = require('../options/mySqlite3');
const DbContainer = require('../DbContainer/DbContainer.js');

const Messages = new DbContainer('./files/messages.txt');

console.log(Messages)

async function anyContainerClean() {

    await Messages.deleteAll()
    
}

module.exports = anyContainerClean;
