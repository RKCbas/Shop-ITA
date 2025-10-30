import { Router } from "express";
import app from "../config/app";
import usersRouter from "./users.Router";
import productsRouter from "./productsRouter";

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
    res.status(200).send('API de Shopita funcionando correctamente')
});

app.use('/users', usersRouter)
app.use('/products', productsRouter)

export default apiRouter;
