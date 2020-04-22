const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({
        username,
        password: hashedPassword,
        registeredDate: Date.now(),
    });
    await user.save();

    return res.sendStatus(200);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();

    if (!user) {
        return res.status(400).json({ msg: 'User not found!' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ msg: 'Username or password is not correct!' });
    }

    user.latestLogedInDate = Date.now();
    await user.save();

    const payload = {
        sub: user.id,
        exp: Date.now() / 100 + 60 * 2, // 2 hour since the token signed
    };
    const jwtAuthToken = jwt.sign(payload, process.env.JWT_SECRET);
    const userId = user.id;

    return res.json({ jwtAuthToken, userId });
});

router.use('/testlogin', passport.authenticate(['jwt', 'google-token'], { session: false }), (req, res) => {
    return res.status(200).json({ user: req.user });
});

router.get('/test', (req, res) => res.status(200).json({ msg: 'auth route working' }));

module.exports = router;
