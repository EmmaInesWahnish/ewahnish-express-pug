import AnyContainer from './Container.js';
const persons = [
    {
        nombre: "Hernan",
        apellido: "Figueroa",
        edad: 50,
    },
    {
        nombre: "Carmen",
        apellido: "Fontana",
        edad: 35
    },
    {
        nombre: "Carolina",
        apellido: "Presley",
        edad: 25,
    },
]

const People = new AnyContainer('./files/personas.txt');

async function anyContainerLoader() {

    await People.deleteLoadExpress(persons)
    

}

export default anyContainerLoader;
