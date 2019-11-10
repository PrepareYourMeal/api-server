const passport = require("passport");
const User = require('../models/User');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
    // User.findById(id).then(user => {
    //     done(null, user);
    // });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            // let userData = {
            //     email: profile.emails[0].value,
            //     name: profile.displayName,
            //     googleId: profile.id,
            //     token: accessToken
            // };
            // done(null, userData);

            // const user = await User.findOneAndUpdate({ googleId: profile.id },
            //     {
            //         googleId: profile.id,
            //         name: profile.displayName,
            //         email: profile.emails[0].value,
            //         photo: profile.photos[0].value,
            //         authToken: accessToken
            //     },
            //     {'upsert': 'true'});
            // if (user) {
            //     await user.save();
            // }
            

            // let userData = {
            //     userId: user.id,
            //     name: user.name,
            //     token: accessToken
            // }

            // done(null, userData);

            console.log(profile);
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                existingUser.authToken = accessToken;
                existingUser.photo = profile.photos[0].value;
                existingUser.email = profile.emails[0].value;
                await existingUser.save()
                let userData = {
                    token: accessToken,
                    id: existingUser.id
                }
                done(null, userData);
            } else {
                const newUser = await new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value,
                    authToken: accessToken
                });
                await newUser.save();
                let userData = {
                    token: accessToken,
                    id: newUser.id
                }
                done(null, userData);
            }
        } catch (e) {
            console.log(e)
        }
    })
);