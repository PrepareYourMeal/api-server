const authRoute = require('./auth');
const configAPI = require('./api');

module.exports = app => {
    app.use('/auth', authRoute);
    configAPI(app);
    app.use('*', (req, res) => res.status(404).json({ msg: 'Page Not Found' }));
};
