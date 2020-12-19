import { InvalidInputError } from "../error/InvalidInputError";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Music, MusicInputDTO } from "../model/Music";
import { MusicDatabase } from "../data/MusicDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { Genre } from "../model/Genre";
import { GenreMusicDatabase } from "../data/GenreMusicDatabase";
import { GenreMusic } from "../model/GenreMusic";
import { MusicDetails } from "../model/MusicDetails";

export class MusicBusiness {
    constructor(
        private authenticator: Authenticator,
        private musicDatabase: MusicDatabase,
        private genreDatabase: GenreDatabase,
        private genreMusicDatabase: GenreMusicDatabase,
        private idGenerator: IdGenerator
    ){}

    public async addMusic(input: MusicInputDTO, token:string):Promise<void> {
        try {
            
            if(!input.author || !input.album || !input.date || !input.file || !input.title || !input.genre.length){
                throw new InvalidInputError("Invalid request body");
            }

            input.genre = input.genre[0].replace(' ','').split(',')

            const user = this.authenticator.getData(token)
            const idMusic = this.idGenerator.generate()
            
            const newMusic:Music = Music.toMusicModel({
                ...input,
                id: idMusic,
                id_user: user.id
            })
            await this.musicDatabase.createMusic(newMusic) 

            for(const index in input.genre){
                const newGender: Genre = Genre.toGenreModel({id: this.idGenerator.generate(), name: input.genre[index]}) 
                await this.genreDatabase.createGenre(newGender)

                const dataGenre = await this.genreDatabase.getGenreByName(input.genre[index]) 

                const newGenreMusic: GenreMusic = GenreMusic.toGenreMusicModel({id_music: idMusic, id_genre: dataGenre.getId()})
                await this.genreMusicDatabase.createGenreMusic(newGenreMusic)
            }
            
        } catch (error) {
            throw new Error(error)
        }
    }

    public async getAllMusic(token:string): Promise<Music[]> {
        try {
           const user = this.authenticator.getData(token)

           const listMusic:Music[] = await this.musicDatabase.getAllMusic(user.id)

           return listMusic
            
        } catch (error) {
            throw new Error(error);  
        }
    }

    public async getMusicDetails(idMusic:string): Promise<MusicDetails> {
        try {
            const music:Music = await this.musicDatabase.getMusicById(idMusic)
            const genres:Genre[] = await this.genreDatabase.getGenresByIdMusic(idMusic)

            const musicDetails:MusicDetails = MusicDetails.toMusicDetailsModel(music, genres)

            return musicDetails

        } catch (error) {
            throw new Error(error);
        }
    }
}
