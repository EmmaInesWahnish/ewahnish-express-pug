import express from 'express';
import { __dirname } from '../utils.js'
import multer from 'multer'

const uploadRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${+Date.now()}`)
    }
})
const upload = multer({ storage });

uploadRouter.post('/uploadfile', upload.array('files'), (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    if (!file) {
        const error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.json({
        merrage: `File <b>${file.originalname}</b> successfully uploaded`
    })
})

export default uploadRouter
