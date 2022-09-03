const faker = require('faker')

faker.locale = "es";

const generateAuthor = () => {
    let generated_author = {
        author:{
        email: faker.internet.email(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.datatype.number({min: 20, max: 80}),
        alias: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        }
    }
    return generated_author
}
module.exports = generateAuthor