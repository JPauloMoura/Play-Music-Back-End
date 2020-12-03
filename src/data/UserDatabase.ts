import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    public createUser = async (user:User):Promise<void> => {
        try {
            await this.getConnection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                password: user.getPassword()
            })
            .into(this.tableNames.user)
        } catch (err) {
            if(err.sqlMessage.includes("Duplicate entry")){
                throw new Error("This email is already registered"); 
            }
            throw new Error(err.Message || err.sqlMessage); 
        }
    }
}
// usar o metodo toUserModel( ) para modelar os dados da requisição do banco