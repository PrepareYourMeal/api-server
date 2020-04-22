const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('../models/User');

module.exports = app => {
    app.use(passport.initialize());

    passport.use(
        new GoogleTokenStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
            async (accessToken, refreshToken, profile, done) => {
                const { id: googleId } = profile;
                const user = await User.findOrCreateByGoogleId(googleId);

                return done(null, user);
            }
        )
    );

    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwtAuthToken'),
                secretOrKey: process.env.JWT_SECRET,
            },
            async (jwtPayload, done) => {
                const { sub: userId } = jwtPayload;
                try {
                    const user = await User.findById(userId).exec();
                    if (!user) {
                        return done(null, false, { msg: 'User not found!' });
                    }

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );
};
