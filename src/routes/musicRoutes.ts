import express from "express"
import { MusicController } from "../controller/MusicController"
import multer from "multer"
import config from "../middleware/config"
import {authVerify} from "../middleware/authVerifey"

export const musicRoute = express.Router()
const musicController = new MusicController()
const upload = multer(config)

musicRoute.post("/upload", authVerify, upload.single("file"), musicController.createMusic)
musicRoute.get("/all", authVerify, musicController.getAllMusic)
