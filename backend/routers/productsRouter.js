import express from 'express';
import { createProduct, deleteProduct, findProducts, getProducts, getProductsById, updateProduct } from '../controllers/productController';


const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProductsById);
productsRouter.get('/find', findProducts); // Endpoint vulnerable
productsRouter.post('/', createProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;
