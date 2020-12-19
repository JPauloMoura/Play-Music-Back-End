import { Genre } from "./Genre"
import { Music } from "./Music"

export class MusicDetails {
   
    constructor(
        private music: Music,
        private genres: Genre[],
    ){}

    getMusic = () => this.music
    getGenres = () => this.genres
    
    setMusic = (music: Music) => this.music = music
    setGenres = (genres: Genre[]) => this.genres = genres

    static toMusicDetailsModel = (music: Music, genres: Genre[]):MusicDetails =>{
        return (music && genres && new MusicDetails(
            music,
            genres
        ))
    }

}
