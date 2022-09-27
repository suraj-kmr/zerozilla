const express = require('express');
const router = express.Router();
const {validateUser} = require('../middleware/validation');
const agencyController = require('../controllers/agencyController');
const verifyToken = require('../middleware/auth');

// Agency and Client Creation 
router.post('/',validateUser, agencyController.create)

// Agency and Client Update
router.put('/:clientId', verifyToken, agencyController.update)

// Get Max Record
router.get('/:agencyId', verifyToken, agencyController.get)

module.exports = router; 