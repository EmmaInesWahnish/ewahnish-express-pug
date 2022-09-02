import bcrypt from 'bcrypt';

/* Bcrypts */
export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

module.exports = {createHash, isValidPassword};