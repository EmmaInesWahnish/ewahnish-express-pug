import FileContainer from '../../api/FileContainer.js';

class CartsDaoFiles extends FileContainer {

    constructor() {
        super('./DB/carritos.json')
    }

    async disconnect() {

    }
}

export default CartsDaoFiles;