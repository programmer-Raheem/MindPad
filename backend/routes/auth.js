const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "faizan is a good boy";

// ------------------------------------------------------
// ROUTE 1: Create a User using POST "/api/auth/createuser" — No login required
// ------------------------------------------------------ 
router.post(
  '/createuser',
  [
    body('name', 'Name is required').isLength({ min: 3 }),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Validate fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with this email exists already
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create and save new user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Generate JWT token
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);

      // Send response
      res.json({ success:true, authToken });
    } catch (err) {
      console.error('❌ Error saving user:', err);
      res.status(500).json({
        success:false,
        error: 'Server Error',
        message: err.message,
      });
    }
  }
);

// ------------------------------------------------------
// ROUTE 2: Authenticate a User using POST "/api/auth/login"
// ------------------------------------------------------
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    // Validate fields
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({success, authToken });
    } catch (error) {
      console.error('❌ Error authenticating user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ------------------------------------------------------
// ROUTE 3: Get logged-in user details using POST "/api/auth/getuser"
// ------------------------------------------------------
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id; // "req.user" is set by fetchuser middleware
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
