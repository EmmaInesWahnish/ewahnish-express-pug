import CartsDaoFile from './carts/CartsDaoFile.js'
import CartsDaoFirebase from './carts/CartsDaoFirebase.js'
import CartsDaoMongoDb from './carts/CartsDaoMongoDb.js'
import CartsDaoMariaDb from './carts/CartsDaoMariaDb.js'
import CartsDaoSql from './carts/CartsDaoSql'
import envs from '../../dotenvConfig.js'

const db = envs.APIP_TYPE || 'FILE'

let cartDao

switch (db) {
    case 'FIREBASE':
        cartDao = new CartsDaoFirebase()
        break
    case 'MONGODB':
        cartDao = new CartsDaoMongoDb()
        break
    case 'MARIADB':
        cartDao = new CartsDaoMariaDb()
        break
    case 'SQL':
        cartDao = new CartsDaoSql()
        break
    default:
        cartDao = new CartsDaoFile()
        break
}

export { cartDao }