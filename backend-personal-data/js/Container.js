const fs = require('fs')

class Container {
    constructor(fileName){
        this.fileName = fileName
    }

    async getAll() {
        try {
            const fileData = await fs.promises.readFile(this.fileName)

            const array = JSON.parse(fileData)

            return array
           
        } catch (error) {
           const array = []
           await fs.promises.writeFile(this.fileName, JSON.stringify(array))

           return array
        }
    }


    async save(object) {
        try { 
            const elements = await this.getAll()                                    
            const newID = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1
            object.id = newID

            elements.push(object)

            const fileData = JSON.stringify(elements, null, 3)

            await fs.promises.writeFile(this.fileName, fileData)


            return newID
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getById(id) {
        try {
            
            const elements = await this.getAll()

            const elementFound = elements.find((element) => element.id == id)

            return elementFound
        } catch (error) {
            console.log(error)    
        }
    }

    async deleteById(id) {
        try {
            const elements = await this.getAll()

            const whichId = elements.findIndex(element => element.id === id);

            if (whichId !== -1) {
                let removedObject = [];
                removedObject = elements.splice(whichId, 1);
                console.log("Deleted product ", removedObject);
                await fs.promises.writeFile(this.fileName, JSON.stringify(elements, null, 3))
                return removedObject;    
            } else {
                console.log("There is no product with id ", findId);
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]));
            return [];
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports =  Container 
