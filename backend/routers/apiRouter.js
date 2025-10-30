import { Router } from "express";

const apiRouter = Router();

apiRouter.use('/', (_req, res) => {
    res.status(200).send('Ping')
});

export default apiRouter;
