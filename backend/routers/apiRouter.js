import { Router } from "express";
import productsRouter from "./productsRouter.js";
import authRouter from "./authRouter.js";

const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
    res.status(200).send('API de Shopita funcionando correctamente')
});

apiRouter.use('/auth', authRouter)
apiRouter.use('/products', productsRouter)

export default apiRouter;
