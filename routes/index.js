const passport = require('passport');
const authRoute = require('./auth');
const adminRoute = require('./admin');
const configAPI = require('./api');

module.exports = app => {
    app.use('/auth', authRoute);
    app.use('/admin', passport.authenticate('jwt', { session: false }), adminRoute);
    configAPI(app);
    app.use('*', (req, res) => res.status(404).json({ msg: 'Page Not Found' }));
};
