const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const email = require('../../middleware/email');
const { emailVerify } = require('../../utils/emailVerif');
const { passwordReset } = require('../../utils/passwordReset');

const router = new express.Router();

const User = require('../../models/Users');

// @route  POST api/users
// @desc   Register User
// @access Public
router.post('/', [
    check('email', 'Email must be a valid email')
        .isEmail(),
    check('password', 'Unvalid password, please use at least 8 characters')
        .isLength({ min: 8 })
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            email,
            password
        });
        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtEmailSecret'),
            { expiresIn: 3600 },
            async (err, token) => {
                if (err) throw err;
                // Sent email verification with token
                const emailVerifRes = await emailVerify(user, token);
                res.json({ VerUrl: `localhost:5000/api/auth/${token}`, emailVerifRes: emailVerifRes.config.data, msg: 'Please check your email and verify.' });
            }
        );
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route  PATCH api/users
// @desc   Reset user password
// @access Public
router.patch('/', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            res.status(404).json({ msg: 'No user with such email' });
        }
        else {
            // Generate new password
            const password = 'newpassword';
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            const postmarkRes = await passwordReset(user, password);

            res.send({ msg: `Password for user ${user.email} is reset, check email for new password`, postmark: postmarkRes.data });
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});

// @route  GET api/users
// @desc   Get all users
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password -log');
        res.json(users);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});

// @route  GET api/users/:id
// @desc   Get user by id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route  POST api/users/user
// @desc   Create a user
// @access Private
router.post(
    '/user',
    [
        auth,
        [
            check('email', 'Email must be a valid email')
                .isEmail(),
            check('password', 'Unvalid password, please use at least 8 characters')
                .isLength({ min: 8 })
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({
                email,
                password
            });
            // Encrypt password

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtEmailSecret'),
                { expiresIn: 3600 },
                async (err, token) => {
                    if (err) throw err;
                    // Sent email verification with token
                    const emailVerifRes = await emailVerify(user, token);
                    res.json({ VerUrl: `localhost:5000/api/auth/${token}`, emailVerifRes: emailVerifRes.config.data, msg: `User ${user.email} created` });
                }
            );
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route  DELETE api/users/:id
// @desc   Delete a user
// @access Private
router.delete('/:id', [auth, email], async (req, res) => {
    try {
        const { user } = req;
        const { notificationRes } = req;
        await user.remove();
        res.json({ oldUserId: user._id, notificationRes, msg: 'User deleted' });
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
