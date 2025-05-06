// CartRoutes.js
import express from 'express';
const router = express.Router();
import Cart from '../mongoDB/cartSchema.js';

// POST /api/cart/add
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Check if product already exists in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/cart/get?userId=123
router.get('/get', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Updated populate to reflect the correct field
    const userCart = await Cart.find({ userId }).populate('items.product');
    res.status(200).json(userCart);
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    console.error(error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/cart/
router.put('/update-quantity', async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    action === 'increase'
      ? item.quantity++
      : item.quantity = Math.max(1, item.quantity - 1);

    await cart.save();
    res.status(200).json({ message: 'Quantity updated', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/cart/delete?userId=123456
router.delete('/delete', async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (!userId || !productId) return res.status(400).json({ message: 'Missing userId or productId' });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemExists = cart.items.some(item => item.product.toString() === productId);
    if (!itemExists) return res.status(404).json({ message: 'Item not in cart' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Item deleted from cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear the Cart after an order is placed
router.post("/clear", async (req, res) => {
  const { userId } = req.body;
  try {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear cart." });
  }
});






export default router;