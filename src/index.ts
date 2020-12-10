import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import {AddressInfo} from "net";
import { userRoute } from "./routes/userRoutes";
import { musicRoute } from "./routes/musicRoutes";

dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use("/", userRoute)
app.use("/music", musicRoute)

const server = app.listen(3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });
