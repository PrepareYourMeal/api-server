const passport = require('passport');
const ingredientsRoute = require('./ingredients');
const profileRoute = require('./profile');
const recipesRoute = require('./recipes');
const userRoute = require('./user');

module.exports = app => {
    app.use('/api/ingredients', passport.authenticate(['jwt', 'google-token'], { session: false }), ingredientsRoute);
    app.use('/api/profile', passport.authenticate(['jwt', 'google-token'], { session: false }), profileRoute);
    app.use('/api/recipes', recipesRoute);
    app.use('/api/user', passport.authenticate(['jwt', 'google-token'], { session: false }), userRoute);
};
