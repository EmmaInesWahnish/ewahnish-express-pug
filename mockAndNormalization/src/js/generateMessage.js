const faker = require('faker');

faker.locale = "es";

const avatars = [
    '/images/avatar01F.png',
    '/images/avatar02F.png',
    '/images/avatar03F.png',
    '/images/avatar04F.png',
    '/images/avatar05F.png',
    '/images/avatar06F.png',
    '/images/avatar01M.png',
    '/images/avatar02M.png',
    '/images/avatar03M.png',
    '/images/avatar04M.png',
    '/images/avatar05M.png',
    '/images/avatar06M.png'    
];

const emails = [
    'af@gmail.com',
    'bf@gmail.com',
    'cf@gmail.com',
    'df@gmail.com',
    'ef@gmail.com',
    'ff@gmail.com',
    'am@gmail.com',
    'bm@gmail.com',
    'cm@gmail.com',
    'dm@gmail.com',
    'em@gmail.com',
    'fm@gmail.com'
];

const nombres = [
    'Lucia',
    'Maria',
    'Candelaria',
    'Sofia',
    'Guadalupe',
    'Francisca',
    'Jose',
    'Roberto',
    'Manuel',
    'Maximiliano',
    'Jorge',
    'Pablo'
];

const alias = [
    'Lucy',
    'Mari',
    'Cande',
    'Sofi',
    'Lupe',
    'Paca',
    'Joe',
    'Rober',
    'Manu',
    'Maxi',
    'George',
    'Paul'
];


const generateMessage = () => {
    let i = Math.floor(Math.random()*11)
    console.log("Avatar array number ",i)
    let generated_message = {
        timestamp: faker.datatype.datetime(),
        author:{
        email: emails[i],
        nombre: nombres[i],
        apellido: faker.name.lastName(),
        edad: faker.datatype.number({min: 20, max: 45}),
        alias: alias[i],
        avatar: avatars[i],
        },
        text: faker.lorem.sentence()
    }
    console.log('in generateMessage ', generated_message)
    return generated_message
}

module.exports = generateMessage