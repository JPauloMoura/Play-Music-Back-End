import * as jwt from "jsonwebtoken";

export class Authenticator {
  public generateToken(input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!): string {
    const token = jwt.sign({
      id: input.id
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
      
      const result = {
        id: payload.id
      };
      
      return result;
    } catch (error) {
      if(error.message.includes("jwt")) throw new Error("Token invalido")
      throw new Error(error)
    }
  }
}

interface AuthenticationData {
  id: string;
}