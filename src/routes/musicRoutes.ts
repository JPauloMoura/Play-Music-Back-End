import express from "express"
import { MusicController } from "../controller/MusicController"
import {authVerify} from "../middleware/authVerifey" 

export const musicRoute = express.Router()
const musicController = new MusicController()

musicRoute.post("/upload", authVerify, musicController.createMusic)
musicRoute.get("/all", authVerify, musicController.getAllMusic)
