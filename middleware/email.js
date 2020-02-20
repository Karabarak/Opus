const config = require('config');
const axios = require('axios');
const User = require('../models/Users');

module.exports = async (req, res, next) => {
    try {
        const user = await (await User.findById(req.params.id));

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = user;

        // Email notification logic
        const notificationRes = await axios({
            method: 'post',
            url: config.get('postmarkCurl'),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Postmark-Server-Token': config.get('postmarkKey')
            },
            data: {
                From: 'norifications@userapp.ee',
                To: user.email,
                Subject: 'Users App',
                HtmlBody: `<html><body><p>Your Users App acccount ${user.email} has been deleted.</p></body></html>`
            }
        });
        req.notificationRes = notificationRes.config;
        next();
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server error');
    }
};
