const {fileURLToPath} = require('url')
const { dirname } = require('path')
const bcrypt = require('bcrypt');

/* Bcrypts */
const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

module.exports =  __dirname;
module.exports = createHash;
module.exports = isValidPassword;