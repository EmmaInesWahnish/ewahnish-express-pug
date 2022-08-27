import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'

/* Bycrypts */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = password 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;