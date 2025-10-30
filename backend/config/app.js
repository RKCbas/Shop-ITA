import express from "express"
import { ServerLog } from "../middleware/log.js";
import { notFoundRoute } from "../middleware/notFound.js";
import apiRouter from "../routers/apiRouter.js";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*',           // Permite cualquier dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));
app.use(express.json({ limit: '50mb' })); // Importante para imágenes base64
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// LOG de peticiones
app.use(ServerLog)

// Rutas
app.use('/api', apiRouter)

// Manejo de rutas no definidas (404)
app.use(notFoundRoute);

export default app;