const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');

// View basket for a user (GET /basket/:userId)
router.get('/:userId', basketController.getBasket);

// Add to basket (POST /basket/add)
router.post('/add', basketController.addToBasket);

// Remove from basket (DELETE /basket/remove)
router.delete('/remove', basketController.removeFromBasket);

module.exports = router;
