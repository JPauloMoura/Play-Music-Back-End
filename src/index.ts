import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import {AddressInfo} from "net";

dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response)=>{
  res.send({message: "aplicação funcionando"})
})

const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });