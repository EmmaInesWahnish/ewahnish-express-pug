const avatars = [
    '/images/avatar01F.png',
    '/images/avatar02F.png',
    '/images/avatar03F.png',
    '/images/avatar04F.png',
    '/images/avatar01M.png',
    '/images/avatar02M.png',
    '/images/avatar03M.png',
    '/images/avatar04M.png'
];

const emails = [
    'af@gmail.com',
    'bf@gmail.com',
    'cf@gmail.com',
    'df@gmail.com',
    'am@gmail.com',
    'bm@gmail.com',
    'cm@gmail.com',
    'dm@gmail.com',
];

const nombres = [
    'Candelaria',
    'Sofia',
    'Guadalupe',
    'Roberto',
    'Manuel',
    'Pablo'
];

const edades = [
    16,
    30,
    35,
    18,
    45,
    23
];

const ids = [
    1,
    2,
    3,
    4,
    5,
    6
];

const apellidos = [
    'Arlentano',
    'Preciado',
    'Arteaga',
    'Perez',
    'Rossi',
    'Perotti'
];


const alias = [
    'Cande',
    'Sofi',
    'Lupe',
    'Rober',
    'Manu',
    'Paul'
];

const generateMessage = (id) => {
    let i = Math.floor(Math.random() * 5);
    let generated_message = {
        message: {
            id: id,
            timestamp: new Date(),
            author: {
                id: ids[i],
                email: emails[i],
                nombre: nombres[i],
                apellido: apellidos[i],
                edad: edades[i],
                alias: alias[i],
                avatar: avatars[i],
            },
            text: 'Buenos dias!!'
        }
    }
    return generated_message
}

module.exports = generateMessage