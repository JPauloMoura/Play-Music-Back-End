import {Request, Response} from "express"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { BaseDatabase } from "../data/BaseDatabase"
import { MusicInputDTO } from "../model/Music"
import { MusicDatabase } from "../data/MusicDatabase"
import { GenreDatabase } from "../data/GenreDatabase"
import { MusicBusiness } from "../business/MusicBusiness"
import { GenreMusicDatabase } from "../data/GenreMusicDatabase"

export class MusicController {
    public async createMusic(req: Request, res: Response):Promise<void> {
        try {
        
            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                genre: [req.body.genre],
                album: req.body.album,
                file: req.file.path,
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

            res.status(200).send({message: "Sucesso", arquivo: req.file.originalname });
        } catch (error) {
            if(error.message.includes("jwt")){
                res.status(400).send("token invalido")
            }
            res.status(400).send({message: error.message || error.sqlMessage})
        } finally{
          await  BaseDatabase.destroyConnection()
        }
    }
}

/**
{
    "title": "nome da musica",
    "author": "nome da banda",
    "genre": ["genero1","genero2"],
    "album": "album"
}
 * 
 * 
 */
