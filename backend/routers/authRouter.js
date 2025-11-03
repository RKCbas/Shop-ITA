import { Router } from "express";
import { checkToken, login, register } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', login); // Endpoint vulnerable
authRouter.post('/register', register);
authRouter.post('/check-token', checkToken);


export default authRouter;
