const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const n = require('./modelNames');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        // unique: true,
    },
    googleId: {
        type: String,
    },
    password: {
        type: String,
    },
    planner: {
        monday: [
            {
                recipeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: n.Recipe,
                },
            },
        ],
        tuesday: [
            {
                recipeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: n.Recipe,
                },
            },
        ],
        wednesday: [
            {
                recipeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: n.Recipe,
                },
            },
        ],
        thursday: [
            {
                recipeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: n.Recipe,
                },
            },
        ],
        friday: [
            {
                recipeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: n.Recipe,
                },
            },
        ],
        saturday: [
            {
                recipeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: n.Recipe,
                },
            },
        ],
        sunday: [
            {
                recipeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: n.Recipe,
                },
            },
        ],
        date: {
            type: Date,
            default: Date.now,
        },
    },
    inventory: [
        {
            ingredientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: n.Ingredient,
            },
            name: {
                type: String,
            },
            spoonId: {
                type: Number,
            },
        },
    ],
    favourites: [
        {
            recipeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: n.Recipe,
            },
        },
    ],
    tags: {
        type: [String],
    },
});

UserSchema.statics.findOrCreateByGoogleId = async function(googleId) {
    const UserSch = this;
    let user;
    user = await this.findOne({ googleId }).exec();
    if (!user) {
        user = new UserSch({ googleId });
        await user.save();
    }

    return user;
};

UserSchema.statics.findAndValidateByUsernameAndPassword = async function(username, password) {
    const user = await this.findOne({ username }).exec();
    if (!user) {
        throw new Error(`The username ${username} is not found!`);
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
        throw new Error('The username or the password is not correct');
    } else {
        return user;
    }
};

module.exports = mongoose.model('User', UserSchema);
