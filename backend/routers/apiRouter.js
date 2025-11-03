import { Router } from "express";
import app from "../config/app.js";
import productsRouter from "./productsRouter.js";
import authRouter from "./authRouter.js";

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
    res.status(200).send('API de Shopita funcionando correctamente')
});

app.use('/auth', authRouter)
app.use('/products', productsRouter)

export default apiRouter;
