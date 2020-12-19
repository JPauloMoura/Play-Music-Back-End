import {Request, Response} from "express"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { BaseDatabase } from "../data/BaseDatabase"
import { MusicInputDTO } from "../model/Music"
import { MusicDatabase } from "../data/MusicDatabase"
import { GenreDatabase } from "../data/GenreDatabase"
import { MusicBusiness } from "../business/MusicBusiness"
import { GenreMusicDatabase } from "../data/GenreMusicDatabase"
import { S3Service } from "../services/S3Service"

export class MusicController {
    public async createMusic(req: Request, res: Response):Promise<void> {
        try {
            const file = req.files && (req.files.file as any)

            const s3Services = new S3Service();
            const result = await s3Services.uploadFile({
                name: file.name,
                file: file.data,
            })

            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                genre: [req.body.genre],
                album: req.body.album,
                file: result.link,
                date: new Date()
            }

            const musicBusiness = new MusicBusiness(
                new Authenticator,
                new MusicDatabase,
                new GenreDatabase,
                new GenreMusicDatabase,
                new IdGenerator,
            )

            await musicBusiness.addMusic(input, req.headers.authorization as string)

            res.status(200).send({message: "Sucesso", arquivo: result });
        } catch (error) {
            if(error.message.includes("jwt")){
                res.status(400).send("token invalido")
            }
            res.status(400).send({message: error.message || error.sqlMessage})
        } finally{
          await  BaseDatabase.destroyConnection()
        }
    }

    public async getAllMusic(req: Request, res: Response):Promise<any> {
        try {

            const musicBusiness = new MusicBusiness(
                new Authenticator,
                new MusicDatabase,
                new GenreDatabase,
                new GenreMusicDatabase,
                new IdGenerator,
            )
            
            const listMusic = await musicBusiness.getAllMusic(req.headers.authorization as string)
            
            res.status(200).send(listMusic)
        } catch (error) {
            res.status(400).send({message: error.message || error.sqlMessage})
        }
    }
}

