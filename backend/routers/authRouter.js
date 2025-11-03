import express from 'express';
import { login, register } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/login', login); // Endpoint vulnerable
authRouter.post('/register', register);


export default authRouter;
