class DbContainer {
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
        } catch (error) {
            console.log(error);
        }
        console.log('productos eliminados')
    }

    async saveArray(array) {
        const connection = this.myDbConnection
        const theTable = this.myTable

        array.forEach(async function (item) {

            try {
                await connection(theTable).insert(item);
            }
            catch (e) {
                console.log(e);
            }
        });

        console.log('Producto/s Agregado/s');
    }

    async getAll() {
        let array = await this.myDbConnection.from(this.myTable).select("*");
        return array;
    }

    async getById(myId) {
        let array = await this.myDbConnection.from(this.myTable).select("*").where({ id: myId });
        return array;
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

            elements = [];

            elements.push(object)

            await this.saveArray(object)

        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getLines() {
        try {
            array = await this.getAll();
            return array
        } catch (error) {
            const array = [];
            return array
        }
    }
}

module.exports = DbContainer;