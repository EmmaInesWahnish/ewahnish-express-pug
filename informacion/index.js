import os from 'os';
import cluster from 'cluster';
import express from 'express';

const CPUs = os.cpus().length;

const app = express();

if (cluster.isPrimary) {

    console.log(` Soy un proceso primario con pid ${process.pid}`);
    console.log("Generando child process ...");
    for (let i = 0; i < CPUs; i++) {
        cluster.fork();
    }
    cluster.on('message', message => {console.log(message)})
    cluster.on('exit', worker => {
        console.log(`El proceso hijo ${worker.process.pid} murio :(`);
        cluster.fork()
    })
}
else {
    console.log(`Proceso hijo con pid ${process.pid} inicializado`)
    app.listen(8080,()=>console.log(`Listening on port 8080`))

}

app.get('/', (req,res)=>{
    process.send('Hola');
    res.send(`El proceso ${process.pid} :)`)
})
