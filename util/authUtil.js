const axios = require('axios').default;

const TOKEN_VERIFICATION_URL = 'https://oauth2.googleapis.com/tokeninfo';

async function verifyToken(tokenType, token) {
    let googleRes;
    try {
        googleRes = await axios.get(`${TOKEN_VERIFICATION_URL}?${tokenType}=${token}`);
    } catch (err) {
        throw new Error('Google token verification failed');
    }

    if (googleRes.status !== 200) {
        throw new Error('Google token verification failed');
    }

    const googleUserInfo = googleRes.data;
    return googleUserInfo;
}

module.exports = {
    verifyToken,
};
