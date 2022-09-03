import minimist from 'minimist'
const args = minimist(process.argv.slice(2), {alias:{m:"MODE", p:"PORT"}},{default:{m:"production"}})
console.log(args);
let configObject = {
    mode: args.m??"prod",
    port : args.p??0,
    debug: !!args.d,
    others: args._
}
console.log(configObject)