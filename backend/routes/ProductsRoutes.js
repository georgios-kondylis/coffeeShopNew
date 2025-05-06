import express from 'express';
import Product from '../mongoDB/productsSchema.js';

const router = express.Router(); 

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
