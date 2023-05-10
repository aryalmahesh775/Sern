import multer from 'multer'
import path from "path";
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads/Images")
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + '--name--' + path.extname(file.originalname))
    }
})

export const upload = multer({storage:storage})