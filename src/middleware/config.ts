import multer from "multer";
import path from "path";

const config = {
    dest: path.resolve(__dirname, "..", "tmp"),
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "tmp"))
      },
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName)
      }
    })
}

export default config