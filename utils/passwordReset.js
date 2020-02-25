const config = require('config');
const axios = require('axios');

exports.passwordReset = async (user, password) => {
    try {
        const email = await axios({
            method: 'post',
            url: config.get('postmarkCurl'),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Postmark-Server-Token': config.get('postmarkKey')
            },
            data: {
                From: 'notifications@userapp.ee',
                To: user.email,
                Subject: 'Users App',
                HtmlBody: `<html><body><p>Dear User ${user.email}, your new password is ${password}</p>
                </body></html>`
            }
        });

        return email;
    }
    catch (err) {
        return err;
    }
};
