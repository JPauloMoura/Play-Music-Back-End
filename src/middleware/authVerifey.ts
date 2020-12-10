import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function authVerify(req:Request, res:Response, next:NextFunction){
    const token = req.headers.authorization as string
    try {
      if(!token)throw new Error("Token invalido");
      const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
      req.body.userId = payload.id
      next()
    } catch (error) {
      return res.status(401).send({message: error.message})
    }
}