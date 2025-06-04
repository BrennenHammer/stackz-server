import Cart from '../models/Cart.js';

export const addItemToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
      await newCart.save();
      res.json({ message: 'Item added to cart' });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
      await cart.save();
      res.json({ message: 'Item added to cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart items' });
  }
};