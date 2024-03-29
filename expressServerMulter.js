import express from 'express'
import multer from 'multer'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/* ------------------------------------------------------ */
/* Multer config */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

/* ------------------------------------------------------ */
/* Rutas */

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
}
)

app.post('/uploadfile', upload.single('thisFile'), (req, res, next) => {
  const file = req.file
  //console.log(file)
  if (!file) {
    const error = new Error('Error subiendo archivo')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
  //res.send(file)
})

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Server http listening at port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))