const MemoryContainer = require('../api/MemoryContainer.js');
const generateProduct = require('../js/generatePoduct.js')

class ProductsDao extends MemoryContainer {
    constructor() { super()};
    
    populate(quantity=10) {
        let newProducts = []
        for(let i=0; i < quantity; i++ ){
            this.save(generateProduct())
        }
        try {
            newProducts = this.getAll();
        } 
        catch(error){
            console.log(error)
        }

        return newProducts
    }
}

module.exports = ProductsDao