import FirebaseContainer from '../../api/FirebaseContainer.js';

class ProductsDaoFirebase extends FirebaseContainer {

    constructor() {
        super()
        this.myTable = 'productos'
    }

    async disconnect() {

    }
}

export default ProductsDaoFirebase;