export class GenreMusic {
   
    constructor(
        private idMusic: string,
        private idGenre: string,
    ){}

    getIdMusic = () => this.idMusic
    getIdGenre = () => this.idGenre
    
    setIdMusic = (idMusic: string) => this.idMusic = idMusic 
    setIdGenre = (idGenre: string) => this.idGenre = idGenre

    static toGenreMusicModel = (genre: any):GenreMusic =>{
        return (genre && new GenreMusic(
            genre.id_music,
            genre.id_genre,
        ))
    }
}

export interface InputGenreMusicDTO {
    idMusic: string
    idGenre: string
}
