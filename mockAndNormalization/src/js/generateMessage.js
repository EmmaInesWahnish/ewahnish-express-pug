const faker = require('faker')

faker.locale = "es";

const generateMessage = () => {
    let generated_message = {
        timestamp: faker.datatype.datetime(),
        author:{
        email: faker.internet.email(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.datatype.number({min: 20, max: 80}),
        alias: faker.internet.userName(),
        avatar: faker.image.image(),
        },
        text: faker.lorem.sentence()
    }
    console.log('in generateMessage ', generated_message)
    return generated_message
}

module.exports = generateMessage