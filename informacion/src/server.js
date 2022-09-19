import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`El proceso ${process.pid} :)`)
})

console.log(process.argv);

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server http listening at port ${server.address().port} process id ${process.pid}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))