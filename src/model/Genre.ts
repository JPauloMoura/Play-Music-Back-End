export class Genre {
   
    constructor(
        private id: string,
        private genre: string,
    ){}

    getId = () => this.id
    getGenre = () => this.genre
    
    setId = (id: string) => this.id = id 
    setGenre = (genre: string) => this.genre = genre

    static toGenreModel = (genre: any):Genre =>{
        return (genre && new Genre(
            genre.id,
            genre.genre,
        ))
    }
}

export interface InputGenreDTO {
    id: string
    genre: string
}