const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const { emailVerify } = require('../../utils/emailVerif');

const router = new express.Router();

// @route  GET api/auth
// @desc   Get user
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -log');
        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route  GET api/auth/:token
// @desc   Verify user email
// @access Public
router.get('/:token', async (req, res) => {
    const { token } = req.params;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtEmailSecret'));
        const user = await User.findById(decoded.user.id);
        user.emailVerified = true;

        const payload = {
            user: {
                id: user.id
            }
        };

        user.save();

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ msg: `User ${user.email} verified, please log in`, token });
            }
        );
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post('/', [
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        if (!user.emailVerified) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Please verify email' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        user.log.push(new Date());
        user.save();

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
