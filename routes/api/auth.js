const passport = require("passport");
const express = require("express");
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();
const config = require('config');

router.get('/test', (req, res) => {
    res.send("Auth working properly");
});

router.get('/google', passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
}));

router.get('/google/callback', passport.authenticate("google"), async (req, res) => {
    let userId = req.user.userId;
    let token = req.user.token;
    const jwtPayload = {
        authToken: token
    }

    const authJwtToken = jwt.sign(jwtPayload, config.get('jwtSecret'));

    const cookieOptions = {
        httpOnly: true,
        expires: 0
    }

    res.cookie('accessJWT', authJwtToken, cookieOptions);

    return res.redirect(`/dashboard?token=${token}&userId=${userId}`);
    // let token = req.user.token;
    // let profile = await Profile.findOne({ user: req.user.id });
    // if (!profile) {
    //     return res.redirect(`/createProfile?token=${token}&id=${req.user.id}`);
    // }
    // return res.redirect(`/profile?token=${token}&id=${profile.id}`);
});

router.get("/logout", auth, async (req, res) => {
    const userJWT = req.cookies.accessJWT
    const userJWTPayload = jwt.verify(userJWT, config.get('jwtSecret'));

    res.clearCookie('accessJWT');
    const user = await User.findOneAndUpdate({ authToken: userJWTPayload.authToken },
        {
            authToken: null
        });
    console.log(user);
    req.logout();
    res.redirect("/");
});

router.get("/current_user", auth, (req, res) => {
    res.send(req.user);
});






// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const User = require('../../models/User');
// const bcrypt = require('bcryptjs');
// const config = require('config');
// const {check, validationResult} = require('express-validator');
// const jwt = require('jsonwebtoken');


// // GET api/auth
// // authentication route
// // Public access
// router.get('/', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         res.json(user);
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error');
//     }
// });

// // POST api/auth
// // Authenticate user and get token
// // access - Public
// router.post('/', [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (! errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()});
//     }

//     const {email, password} = req.body;

//     try { // check if user exists
//         let user = await User.findOne({email});

//         if (! user) {
//             return res.status(400).json({
//                 errors: [
//                     {
//                         msg: 'Invalid Credentials'
//                     }
//                 ]
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (! isMatch) {
//             return res.status(400).json({
//                 errors: [
//                     {
//                         msg: 'Invalid Credentials'
//                     }
//                 ]
//             });
//         }


//         // return JWT
//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };

//         jwt.sign(payload, config.get('jwtSecret'), {
//             expiresIn: 3600
//         }, (err, token) => {
//             if (err) 
//                 throw err;
            


//             res.json({token});
//         });


//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error...');
//     }
// });

module.exports = router;
