const config = require('config');
const axios = require('axios');

exports.emailVerify = async (user, token) => {
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
                HtmlBody: `<html><body><p>Dear User ${user.email}, please verify your email by clicking on following link.</p>
                <br>
                <a href="localhost:5000/api/auth/${token}">Verify Email</a>
                </body></html>`
            }
        });

        return email;
    }
    catch (err) {
        return err;
    }
};
