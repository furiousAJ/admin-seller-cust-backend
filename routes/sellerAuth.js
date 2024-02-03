const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../model/Seller'); // Create Seller model
const jwtConfig = require('../Connection/jwt');

// Seller signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    // Check if the seller already exists
    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the seller to the database
    const newSeller = new Seller({ name, email, phone, address, password: hashedPassword });
    await newSeller.save();

    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Seller login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the seller in the database
    const seller = await Seller.findOne({ email });

    if (!seller || !(await bcrypt.compare(password, seller.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, jwtConfig.seller.secretKey, { expiresIn: jwtConfig.seller.expiresIn });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
