import { Router } from "express";
import app from "../config/app";
import productsRouter from "./productsRouter";
import authRouter from "./authRouter";

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
    res.status(200).send('API de Shopita funcionando correctamente')
});

app.use('/auth', authRouter)
app.use('/products', productsRouter)

export default apiRouter;
