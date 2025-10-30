import express from 'express';
import { checkToken, login, register } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/login', login); // Endpoint vulnerable
authRouter.post('/register', register);
authRouter.get('/check-auth', checkToken);

export default authRouter;
