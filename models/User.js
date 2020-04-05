const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    googleId: {
        type: String,
    },
    photo: {
        type: String,
    },
    latestLogedInDate: { type: Date },
    registeredDate: {
        type: Date,
    },
    planner: {
        monday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                },
                title: {
                    type: String,
                },
                spoon_id: {
                    type: Number,
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                        },
                        name: {
                            type: String,
                        },
                        spoon_id: {
                            type: Number,
                        },
                        quantity: {
                            type: Number,
                        },
                    },
                ],
                vegetarian: {
                    type: Boolean,
                },
                vegan: {
                    type: Boolean,
                },
                glutenFree: {
                    type: Boolean,
                },
                dairyFree: {
                    type: Boolean,
                },
                ketogenic: {
                    type: Boolean,
                },
                preparationMinutes: {
                    type: Number,
                },
                readyInMinutes: {
                    type: Number,
                },
                servings: {
                    type: Number,
                },
                sourceUrl: {
                    type: String,
                },
                imageUrl: {
                    type: String,
                },
                instructions: {
                    type: [String],
                },
                tags: {
                    type: [String],
                },
            },
        ],
        tuesday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                },
                title: {
                    type: String,
                },
                spoon_id: {
                    type: Number,
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                        },
                        name: {
                            type: String,
                        },
                        spoon_id: {
                            type: Number,
                        },
                        quantity: {
                            type: Number,
                        },
                    },
                ],
                vegetarian: {
                    type: Boolean,
                },
                vegan: {
                    type: Boolean,
                },
                glutenFree: {
                    type: Boolean,
                },
                dairyFree: {
                    type: Boolean,
                },
                ketogenic: {
                    type: Boolean,
                },
                preparationMinutes: {
                    type: Number,
                },
                readyInMinutes: {
                    type: Number,
                },
                servings: {
                    type: Number,
                },
                sourceUrl: {
                    type: String,
                },
                imageUrl: {
                    type: String,
                },
                instructions: {
                    type: [String],
                },
                tags: {
                    type: [String],
                },
            },
        ],
        wednesday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                },
                title: {
                    type: String,
                },
                spoon_id: {
                    type: Number,
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                        },
                        name: {
                            type: String,
                        },
                        spoon_id: {
                            type: Number,
                        },
                        quantity: {
                            type: Number,
                        },
                    },
                ],
                vegetarian: {
                    type: Boolean,
                },
                vegan: {
                    type: Boolean,
                },
                glutenFree: {
                    type: Boolean,
                },
                dairyFree: {
                    type: Boolean,
                },
                ketogenic: {
                    type: Boolean,
                },
                preparationMinutes: {
                    type: Number,
                },
                readyInMinutes: {
                    type: Number,
                },
                servings: {
                    type: Number,
                },
                sourceUrl: {
                    type: String,
                },
                imageUrl: {
                    type: String,
                },
                instructions: {
                    type: [String],
                },
                tags: {
                    type: [String],
                },
            },
        ],
        thursday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                },
                title: {
                    type: String,
                },
                spoon_id: {
                    type: Number,
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                        },
                        name: {
                            type: String,
                        },
                        spoon_id: {
                            type: Number,
                        },
                        quantity: {
                            type: Number,
                        },
                    },
                ],
                vegetarian: {
                    type: Boolean,
                },
                vegan: {
                    type: Boolean,
                },
                glutenFree: {
                    type: Boolean,
                },
                dairyFree: {
                    type: Boolean,
                },
                ketogenic: {
                    type: Boolean,
                },
                preparationMinutes: {
                    type: Number,
                },
                readyInMinutes: {
                    type: Number,
                },
                servings: {
                    type: Number,
                },
                sourceUrl: {
                    type: String,
                },
                imageUrl: {
                    type: String,
                },
                instructions: {
                    type: [String],
                },
                tags: {
                    type: [String],
                },
            },
        ],
        friday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                },
                title: {
                    type: String,
                },
                spoon_id: {
                    type: Number,
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                        },
                        name: {
                            type: String,
                        },
                        spoon_id: {
                            type: Number,
                        },
                        quantity: {
                            type: Number,
                        },
                    },
                ],
                vegetarian: {
                    type: Boolean,
                },
                vegan: {
                    type: Boolean,
                },
                glutenFree: {
                    type: Boolean,
                },
                dairyFree: {
                    type: Boolean,
                },
                ketogenic: {
                    type: Boolean,
                },
                preparationMinutes: {
                    type: Number,
                },
                readyInMinutes: {
                    type: Number,
                },
                servings: {
                    type: Number,
                },
                sourceUrl: {
                    type: String,
                },
                imageUrl: {
                    type: String,
                },
                instructions: {
                    type: [String],
                },
                tags: {
                    type: [String],
                },
            },
        ],
        saturday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                },
                title: {
                    type: String,
                },
                spoon_id: {
                    type: Number,
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                        },
                        name: {
                            type: String,
                        },
                        spoon_id: {
                            type: Number,
                        },
                        quantity: {
                            type: Number,
                        },
                    },
                ],
                vegetarian: {
                    type: Boolean,
                },
                vegan: {
                    type: Boolean,
                },
                glutenFree: {
                    type: Boolean,
                },
                dairyFree: {
                    type: Boolean,
                },
                ketogenic: {
                    type: Boolean,
                },
                preparationMinutes: {
                    type: Number,
                },
                readyInMinutes: {
                    type: Number,
                },
                servings: {
                    type: Number,
                },
                sourceUrl: {
                    type: String,
                },
                imageUrl: {
                    type: String,
                },
                instructions: {
                    type: [String],
                },
                tags: {
                    type: [String],
                },
            },
        ],
        sunday: [
            {
                recipe_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'recipes',
                },
                title: {
                    type: String,
                },
                spoon_id: {
                    type: Number,
                },
                ingredients: [
                    {
                        ingredient_id: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'ingredients',
                        },
                        name: {
                            type: String,
                        },
                        spoon_id: {
                            type: Number,
                        },
                        quantity: {
                            type: Number,
                        },
                    },
                ],
                vegetarian: {
                    type: Boolean,
                },
                vegan: {
                    type: Boolean,
                },
                glutenFree: {
                    type: Boolean,
                },
                dairyFree: {
                    type: Boolean,
                },
                ketogenic: {
                    type: Boolean,
                },
                preparationMinutes: {
                    type: Number,
                },
                readyInMinutes: {
                    type: Number,
                },
                servings: {
                    type: Number,
                },
                sourceUrl: {
                    type: String,
                },
                imageUrl: {
                    type: String,
                },
                instructions: {
                    type: [String],
                },
                tags: {
                    type: [String],
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
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients',
            },
            name: {
                type: String,
            },
            spoon_id: {
                type: Number,
            },
        },
    ],
    grocery: [
        {
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ingredients',
            },
            name: {
                type: String,
            },
            spoon_id: {
                type: Number,
            },
        },
    ],
    favourites: [
        {
            recipe_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes',
            },
            title: {
                type: String,
            },
            spoon_id: {
                type: Number,
            },
            ingredients: [
                {
                    ingredient_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'ingredients',
                    },
                    name: {
                        type: String,
                    },
                    spoon_id: {
                        type: Number,
                    },
                    quantity: {
                        type: Number,
                    },
                },
            ],
            vegetarian: {
                type: Boolean,
            },
            vegan: {
                type: Boolean,
            },
            glutenFree: {
                type: Boolean,
            },
            dairyFree: {
                type: Boolean,
            },
            ketogenic: {
                type: Boolean,
            },
            preparationMinutes: {
                type: Number,
            },
            readyInMinutes: {
                type: Number,
            },
            servings: {
                type: Number,
            },
            sourceUrl: {
                type: String,
            },
            imageUrl: {
                type: String,
            },
            instructions: {
                type: [String],
            },
            tags: {
                type: [String],
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
        user.latestLogedInDate = Date.now();
        await user.save();
        return user;
    }
};

module.exports = mongoose.model('User', UserSchema);
