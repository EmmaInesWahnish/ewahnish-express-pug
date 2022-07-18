import FileContainer from '../../api/FileContainer.js';

class ProductsDaoFiles extends FileContainer {

    constructor() {
        super('./DB/productos.json')
    }

    async disconnect() {

    }
}

export default ProductsDaoFiles;