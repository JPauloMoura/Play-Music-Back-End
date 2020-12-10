import { Music } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

    public createMusic = async (music:Music):Promise<void> => {
        try {
            await this.getConnection()
            .insert({
                id: music.getId(),
                title: music.getTitle(),
                author: music.getAuthor(),
                date: music.getDate(),
                file: music.getFile(),
                album: music.getAlbum(),
                id_user: music.getIdUser()
            })
            .into(this.tableNames.music)
        } catch (err) {
            if(err.sqlMessage.includes("Duplicate entry")){
                throw new Error("This email is already registered"); 
            }
            throw new Error(err.Message || err.sqlMessage); 
        }
    }
}
