import { GenreMusic } from "../model/GenreMusic";
import { BaseDatabase } from "./BaseDatabase";

export class GenreMusicDatabase extends BaseDatabase {
    public createGenreMusic = async (genreMusic: GenreMusic):Promise<void> => {
        try {
            await this.getConnection()
            .insert({
                id_music: genreMusic.getIdMusic(),
                id_genre: genreMusic.getIdGenre(),
            })
            .into(this.tableNames.genreMusic)
            
        } catch (err) {
            throw new Error(err.Message || err.sqlMessage); 
        }
    }

}
