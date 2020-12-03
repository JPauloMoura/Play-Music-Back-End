import {Request, Response} from "express"
import { UserDatabase } from "../data/UserDatabase"
import { UserInputDTO } from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { regexEmail } from "../utils/validRegex"
import { UserBusiness } from "../business/UserBusiness"
import { BaseDatabase } from "../data/BaseDatabase"

export class UserController {
    public async createUser(req: Request, res: Response):Promise<void> {
        try {
            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const userBusiness = new UserBusiness(
                new Authenticator,
                new UserDatabase,
                new IdGenerator,
                regexEmail,
                new HashManager
            )

            const token = await userBusiness.createUser(input)

            res.status(201).send({message:"Success", token})
        } catch (error) {
            res.status(400).send({message: error.message || error.sqlMessage})
        } finally{
          await  BaseDatabase.destroyConnection()
        }
    
    }
}