import ProductsDaoFile from './products/ProductsDaoFile.js'
import ProductsDaoFirebase from './products/ProductsDaoFirebase.js'
import ProductsDaoMongoDb from './products/ProductsDaoMongoDb.js'
import ProductsDaoMariaDb from './products/ProductsDaoMariaDb.js'
import ProductsDaoSql from './products/ProductsDaoSql'
import envs from '../../dotenvConfig.js'

const db = envs.APIP_TYPE || 'FILE'

let productDao

switch (db) {
    case 'FIREBASE':
        productDao = new ProductsDaoFirebase()
        break
    case 'MONGODB':
        productDao = new ProductsDaoMongoDb()
        break
    case 'MARIADB':
        productDao = new ProductsDaoMariaDb()
        break
    case 'SQL':
        productDao = new ProductsDaoSql()
        break
    default:
        productDao = new ProductsDaoFile()
        break
}

export { productDao }