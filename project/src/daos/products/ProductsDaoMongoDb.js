
const db = admin.firestore();

const query = db.collection('productos');

import FirebaseContainer from '../../api/FirebaseContainer.js';

class ProductsDaoFirebase extends FirebaseContainer {

    constructor() {
        super()
        this.db = db;
        this.query = query;
    }

    async disconnect() {

    }
}

export default ProductsDaoFirebase;