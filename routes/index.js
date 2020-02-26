const authRoute = require('./auth');

module.exports = app => {
    app.use('/auth', authRoute);
    app.use('*', (req, res) => res.status(404).json({ msg: 'Page Not Found' }));
};
