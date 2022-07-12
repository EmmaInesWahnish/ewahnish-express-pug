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
        } finally {
            this.myDbConnection.destroy()
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
        finally {
            this.myDbConnection.destroy()
        }

        console.log('productos eliminados')
    }

    async save(item) {
        const connection = this.myDbConnection
        const theTable = this.myTable
        try {
            await connection(theTable).insert(item);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            this.myDbConnection.destroy()
        }

        console.log('Producto/s Agregado/s');
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
        try {
            let array = await this.myDbConnection.from(this.myTable).select("*");
            return array;
        } catch (error) {
            console.log(error);
        } finally {
            this.myDbConnection.destroy();
        }
    }

    async getById(myId) {
        try {
            let array = await this.myDbConnection.from(this.myTable).select("*").where({ id: myId });
            return array;
        } catch (error) {
            console.log(error)
        } finally {
            this.myDbConnection.destroy()
        }

    }

    async deleteLoadExpress(array) {
        try {
            await this.deleteAll();
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            } finally {
                this.myDbConnection.destroy()
            }
        }
        catch (error) {
            console.log(error);
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            }
        } finally {
            this.myDbConnection.destroy()
        }
    }

    async modifyById(myId, myJson) {
        try {
            await this.myDbConnection(this.myTable).where({ id: myId }).update(myJson);
        } catch (error) {
            console.log(error)
        } finally {
            this.myDbConnection.destroy()
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
        } finally {
            this.myDbConnection.destroy()
        }

    }

    async getLines() {
        try {
            array = await this.getAll();
            console.log(array);
            return array
        } catch (error) {
            const array = [];
            return array
        } finally {
            this.myDbConnection.destroy()
        }

    }
}

module.exports = DbContainer;