const passport = require('passport');
const ingredientsRoute = require('./ingredients');
const profileRoute = require('./profile');
const recipesRoute = require('./recipes');

module.exports = app => {
    app.use('/ingredients', passport.authenticate(['jwt', 'google-token'], { session: false }), ingredientsRoute);
    app.use('/profile', passport.authenticate(['jwt', 'google-token'], { session: false }), profileRoute);
    app.use('/recipes', recipesRoute);
};
