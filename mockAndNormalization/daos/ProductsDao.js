const MemoryContainer = require('../api/MemoryContainer.js');
const generateProduct = require('../js/generatePoduct.js')

class ProductsDao extends MemoryContainer {
    constructor() { super()};
    
    populate(quantity=10) {
        const newProducts = []
        for(let i=0; i < quantity; i++ ){
            this.save(generateProduct())
            newProducts.push(generateProduct())
        }
        return newProducts
    }
}

module.exports = ProductsDao