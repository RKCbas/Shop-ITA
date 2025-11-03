import express from 'express';
import { findProducts, getProducts } from '../controllers/productController';


const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/find', findProducts); // Endpoint vulnerable


export default productsRouter;
