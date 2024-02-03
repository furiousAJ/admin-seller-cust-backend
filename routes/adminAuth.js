const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin'); // Adjust the path based on your file structure
const jwtConfig = require('../Connection/jwt');

// Admin Login endpoint
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin in the database
    const admin = await Admin.findOne({ username });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, jwtConfig.admin.secretKey, { expiresIn: jwtConfig.admin.expiresIn });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
