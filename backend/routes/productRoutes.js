import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/',getProducts);
productRouter.post('/addProduct', addProduct);
productRouter.put('/:id',updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;