const express = require('express');
const router = express.Router();

// @route   GET /api/tweets
// @desc    tweets page route
// @access  Public
router.get('/', (req, res) => res.json({ msg: 'twitter api works' }));

module.exports = router;
