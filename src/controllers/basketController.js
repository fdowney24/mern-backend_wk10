const Basket = require('../models/Basket');
const Product = require('../models/Product');

// View basket for a user
exports.getBasket = async (req, res) => {
  try {
    const { userId } = req.params;
    const basket = await Basket.findOne({ userId }).populate('items.product');
    if (!basket) return res.json({ userId, items: [] });
    res.json(basket);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching basket', error: err.message });
  }
};

// Add product to basket (or increase quantity)
exports.addToBasket = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: 'userId and productId required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let basket = await Basket.findOne({ userId });
    if (!basket) {
      basket = await Basket.create({ userId, items: [{ product: productId, quantity }] });
      await basket.populate('items.product');
      return res.status(201).json({ message: 'Added to new basket', basket });
    }

    const existing = basket.items.find(i => i.product.toString() === productId);
    if (existing) {
      existing.quantity = Math.max(1, existing.quantity + quantity);
    } else {
      basket.items.push({ product: productId, quantity });
    }

    await basket.save();
    await basket.populate('items.product');
    res.json({ message: 'Basket updated', basket });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to basket', error: err.message });
  }
};

// Remove product or reduce quantity
exports.removeFromBasket = async (req, res) => {
  try {
    const { userId, productId, removeAll = false } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: 'userId and productId required' });

    const basket = await Basket.findOne({ userId });
    if (!basket) return res.status(404).json({ message: 'Basket not found' });

    const idx = basket.items.findIndex(i => i.product.toString() === productId);
    if (idx === -1) return res.status(404).json({ message: 'Product not in basket' });

    if (removeAll) {
      basket.items.splice(idx, 1);
    } else {
      basket.items[idx].quantity = Math.max(0, basket.items[idx].quantity - 1);
      if (basket.items[idx].quantity === 0) basket.items.splice(idx, 1);
    }

    await basket.save();
    await basket.populate('items.product');
    res.json({ message: 'Basket updated', basket });
  } catch (err) {
    res.status(500).json({ message: 'Error removing from basket', error: err.message });
  }
};
