class SqlContainer {
    constructor(myDbConnection, myTable) {
        this.myDbConnection = myDbConnection;
        this.myTable = myTable;
    }

    async deleteById(myId) {
        try {
            await this.myDbConnection(this.myTable)
                .where({ id: myId })
                .del()
        } catch (error) {
            console.log(error);
        }

        console.log('producto eliminado')

    }

    async deleteAll() {
        try {
            await this.myDbConnection(this.myTable).del()
        }
        catch (error) {
            console.log(error);
        }

        console.log('productos eliminados')
    }

    async save(item) {
        try {
            await this.myDbConnection(this.myTable).insert(item);
            const array = await this.getAll();
            theProductId = array[array.length - 1].id;
            return theProductId;
        }
        catch (e) {
            console.log(e);
        }

        console.log('Producto/s Agregado/s');
    }

    async saveArray(array) {
        const connection = this.myDbConnection
        const theTable = this.myTable
            try {
                await connection(theTable).insert(array);
            }
            catch (e) {
                console.log(e);
            }
        console.log('Producto/s Agregado/s');
    }

    async getAll() {
        try {
            let array = await this.myDbConnection.from(this.myTable).select("*");
            return array;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(myId) {
        try {
            let array = await this.myDbConnection.from(this.myTable).select("*").where({ id: myId });
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
        try {
            await this.myDbConnection(this.myTable).where({ id: myId }).update(myJson);
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

    async updateJsonType(myId, myJsonArray) {
        try {
            this.myDbConnection.table(this.myTable)
            .where({id: myId})
            .update({productos: JSON.stringify(myJsonArray)});
            await this.save(object)

        } catch (error) {
            console.log(error)
            return error
        }

    }

}

export default SqlContainer;