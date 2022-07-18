import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { knex } = require('../../options/mariaDB.cjs');
const { knexSqLite } = require('../../options/mySqlite3.cjs');

import SqlContainer from '../../api/SqlContainer.js';

class CartsDaoSql extends SqlContainer {

    constructor() {
        super()
        this.myDbConnection = knexSqLite;
        this.myTable = 'carritos'
    }

    async disconnect() {

    }
}

export default CartsDaoSql;