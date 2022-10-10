import express from 'express';
import multer from 'multer'

const uploadRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage });

uploadRouter.post('/upload_files', upload.single('avatar'), (req, res) => {
    console.log(req.body)
    console.log(req.files)
    /*if (!file) {
        const error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        return next(error)
    }*/
    res.json({
        merrage: `File <b>${file.originalname}</b> successfully uploaded`
    })
})

export default uploadRouter
