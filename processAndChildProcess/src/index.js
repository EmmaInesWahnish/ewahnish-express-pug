import minimist from 'minimist'
const args = minimist(process.argv.slice(2), {alias:{m:"mode"}},{default:{m:"production"}})
console.log(args);
