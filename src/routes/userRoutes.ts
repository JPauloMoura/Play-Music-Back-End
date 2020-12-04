import express from "express"
import { UserController } from "../controller/UserController"

export const userRoute = express.Router()
const userController = new UserController()

userRoute.post("/singup", userController.createUser)
userRoute.post("/login", userController.login)