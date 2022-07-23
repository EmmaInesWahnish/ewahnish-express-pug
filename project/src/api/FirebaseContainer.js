import db from '../configurations/firebase.config.js';
import { onSnapshot, collection, updateDoc, doc, addDoc, deleteDoc, getDocs, getDoc, DocumentSnapshot } from 'firebase/firestore'

class FirebaseContainer {
    constructor(myTable) {
        this.myTable = myTable;
    }

    async deleteById(myId) {
        const docRef = doc(db, this.myTable, myId)
        try {
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error);
        }

        console.log('producto eliminado')

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
        const collectionRef = collection(db, this.myTable);
        try {
            await addDoc(collectionRef, item);
        }
        catch (e) {
            console.log(e);
        }

        console.log('Producto/s Agregado/s');
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
            const productsCol = collection(db, this.myTable);
            const productsSnapshot = await getDocs(productsCol);
            const array = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            return array;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(myId) {
        let array =[]
        const docRef = doc(db, this.myTable, myId );
        try {
            const docSnap = await getDoc(docRef);
            array = ({ ...docSnap.data(), id: docSnap.id });
            console.log(" en getById", array)
            return array;
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
        const docRef = doc(db, this.myTable, myId);
        try {
            await updateDoc(docRef, myJson);
        } catch (error) {
            console.log(error)
        }

        console.log('producto modificado')
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