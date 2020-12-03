import { UserDatabase } from "../data/UserDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { User, UserInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private authenticator: Authenticator,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private validEmail: RegExp,
        private hashManager: HashManager
    ){}

    public async createUser(input: UserInputDTO):Promise<string> {
        try {
            if(!input.name || !input.email || !input.nickname || !input.password){
                throw new InvalidInputError("Invalid request body");
            }

            if(!this.validEmail.test(input.email)) throw new InvalidInputError("Invalid email format")

            if(input.password.length < 7) throw new InvalidInputError("Password must be longer than 6 characters")

            input.password = await this.hashManager.hash(input.password)

            const newUser:User = User.toUserModel({...input, id: this.idGenerator.generate()})

            await this.userDatabase.createUser(newUser)

            return this.authenticator.generateToken({id: newUser.getId()})
            
        } catch (error) {
            throw new Error(error);
        }
    }
}