const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');

// View basket for a user (GET /basket/:userId)
router.get('/:userId', basketController.getBasket);

// Add to basket (POST /basket/add)
router.post('/add', basketController.addToBasket);

// Remove from basket (DELETE /basket/remove) - reduces quantity or removes
router.delete('/remove', basketController.removeFromBasket);

// Remove a single item by itemId (DELETE /basket/removeItem)
router.delete('/removeItem', basketController.removeItem);

// Clear a user's basket (DELETE /basket/clear)
router.delete('/clear', basketController.clearBasket);

module.exports = router;
