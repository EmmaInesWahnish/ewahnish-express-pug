class FirebaseContainer {
    constructor(myTable) {
        this.myTable = myTable;
    }

    async deleteById(myId) {
        try {
            const doc = this.query.doc(`${myId}`);
            const item = await doc.delete();
            console.log("Item eliminado ", item)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            const productsCol = collection(db, this.myTable);
            const productsSnapshot = await getDocs(productsCol);
            const array = productsSnapshot.docs.map(doc => doc.data());
            for (element in array) {
                let myId = array[element].id;
                this.deleteById(myId);
            }
        } catch (error) {
            console.log(error);
        }

        console.log('productos eliminados')
    }

    async save(item) {
        try {
            const doc = this.query.doc();
            await doc.set(item[0]);
            console.log("Item insertado ")
        }
        catch (e) {
            console.log(e);
        }
    }

    async saveArray(array) {
        const collectionRef = collection(db, this.myTable);
        for (let item in array) {
            try {
                await addDoc(collectionRef, array[item]);
            }
            catch (e) {
                console.log(e);
            }
        }
        console.log('Producto/s Agregado/s');
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get();
            let docs = querySnapshot.docs;
            const response = docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(myId) {
        try {    
            const doc = this.query.doc(`${myId}`);
            const item = await doc.get(doc);
            const response = ({ ...item.data(), id: item.id });
            console.log(" en getById", response)
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteLoadExpress(array) {
        try {
            await this.deleteAll();
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            }
        }
    }

    async modifyById(myId, myJson) {
        try {
            const doc = this.query.doc(`${myId}`);
            let item = await doc.update(myJson);
            console.log("Item actualizado ", item)
        } catch (error) {
            console.log(error)
        }

    }

    async saveLine(object) {
        try {

            await this.save(object)

        } catch (error) {
            console.log(error)
            return error
        }

    }

}

export default FirebaseContainer;