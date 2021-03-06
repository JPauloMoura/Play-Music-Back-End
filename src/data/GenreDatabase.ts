import { Genre } from "../model/Genre";
import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {

    public createGenre = async (genre:Genre):Promise<void> => {
        try {
            await this.getConnection().raw(`
                INSERT IGNORE INTO ${this.tableNames.genre}
                values('${genre.getId()}','${genre.getGenre()}');
            `)
            
        } catch (err) {
            throw new Error(err.Message || err.sqlMessage); 
        }
    }

    public getGenreByName = async (genre: string):Promise<Genre> => {
        try {
            const [resp] = await this.getConnection()
                        .select('*')
                        .from(this.tableNames.genre)
                        .where({genre})

            return Genre.toGenreModel(resp)
        } catch (err) {
            throw new Error(err.Message || err.sqlMessage);
        }
    }

    public getGenresByIdMusic = async (idMusic: string):Promise<Genre[]> => {
        try {
            const [ resp ] = await this.getConnection().raw(`
                SELECT g.id, g.genre FROM ${this.tableNames.genre} AS g
                JOIN ${this.tableNames.genreMusic} AS gm
                ON gm.id_genre = g.id
                WHERE gm.id_music = "${idMusic}";
            `)
        
            return resp.map((item:Genre)=> Genre.toGenreModel(item))
        } catch (err) {
            throw new Error(err.Message || err.sqlMessage);
        }
    }
}
