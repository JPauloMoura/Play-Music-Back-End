export class User {
   
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
    ){}

    getId = () => this.id
    getName = () => this.name
    getEmail = () => this.email
    getNickname = () => this.nickname
    getPassword = () => this.password
    
    setId = (id: string) => this.id = id 
    setName = (name: string) => this.name = name
    setEmail = (email: string) => this.email = email
    setNickname = (nickname: string) => this.nickname = nickname
    setPassword = (password: string) => this.password = password

    static toUserModel = (user: any):User =>{
        return (user && new User(
            user.id,
            user.name,
            user.email,
            user.nickname,
            user.password
        ))
    }
}

export interface UserInputDTO {
    name: string
    email: string
    nickname: string
    password: string 
}

export interface LoginInputDTO {
    email: string
    password: string
}
