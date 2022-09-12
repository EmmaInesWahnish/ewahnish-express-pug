import ProductsDaoFile from './products/ProductsDaoFile.js'
import ProductsDaoFirebase from './products/ProductsDaoFirebase.js'
import ProductsDaoMongoDb from './products/ProductsDaoMongoDb.js'
import ProductsDaoMariaDb from './products/ProductsDaoMariaDb.js'
import ProductsDaoSql from './products/ProductsDaoSql.js'
import envs from '../../dotenvConfig.js'

const db = envs.APIP_TYPE || 'FILE'

let Products

switch (db) {
    case 'FIREBASE':
        Products = new ProductsDaoFirebase()
        break
    case 'MONGODB':
        Products = new ProductsDaoMongoDb()
        break
    case 'MARIADB':
        Products = new ProductsDaoMariaDb()
        break
    case 'SQL':
        Products = new ProductsDaoSql()
        break
    default:
        Products = new ProductsDaoFile()
        break
}

export { Products }