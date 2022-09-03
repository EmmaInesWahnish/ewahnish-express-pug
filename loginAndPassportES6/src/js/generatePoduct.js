const faker = require('faker')

faker.locale = "es";

const generateProduct = () => {
    let generated_product = {
        title: faker.commerce.productName(),
        price: faker.datatype.number({min: 450, max: 1200}),
        thumbnail: faker.image.image(200,150)
    }
    return generated_product
}
module.exports = generateProduct