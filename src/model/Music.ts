export class Music {
   
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: Date,
        private file: string,
        private album: string,
        private idUser: string,
    ){}

    getId = () => this.id
    getTitle = () => this.title
    getAuthor = () => this.author
    getDate = () => this.date
    getFile = () => this.file
    getAlbum = () => this.album
    getIdUser = () => this.idUser
    
    setId = (id: string) => this.id = id
    setTitle = (title: string) => this.title = title
    setAuthor = (author: string) => this.author = author
    setDate = (date: Date) => this.date = date
    setFile = (file: string) => this.file = file
    setAlbum = (album: string) => this.album = album
    setIdUser = (idUser: string) => this.idUser = idUser

    static toMusicModel = (music: any):Music =>{
        return (music && new Music(
            music.id,
            music.title,
            music.author,
            music.date,
            music.file,
            music.album,
            music.id_user
        ))
    }
}

export interface MusicInputDTO {
    title: string,
    author: string,
    date: Date,
    file: string,
    genre: string[],
    album: string
}

