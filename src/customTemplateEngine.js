import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// defino el motor de plantilla
app.engine('cte', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = content.toString()
                            .replace('^^titulo$$', ''+ options.titulo +'')
                            .replace('^^mensaje$$', ''+ options.mensaje +'')
                            .replace('^^autor$$', ''+ options.autor +'')
                            .replace('^^version$$', ''+ options.version +'');
    return callback(null, rendered);
  });
});

app.set('views', './src/views'); // especifica el directorio de vistas

app.set('view engine', 'cte'); // registra el motor de plantillas

app.get('/cte1', function (req, res) {
    req.body = {
      titulo: 'Pronostico del tiempo',
      mensaje: 'El tiempo estara frio (maxima 3 grados centigrados) y con lloviznas esporadicas',
      autor: 'Servicio meteorologico nacional',
      version: 1
    }
    res.render('plantilla1', req.body);
  });
  




/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
