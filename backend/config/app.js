import express from "express"
import { ServerLog } from "../middleware/log.js";
import { notFoundRoute } from "../middleware/notFound.js";
import apiRouter from "../routers/apiRouter.js";

const app = express();

app.use(express.json());
app.use(ServerLog)

// Rutas
app.use('/api', apiRouter)

// Manejo de rutas no definidas (404)
app.use(notFoundRoute);

export default app;