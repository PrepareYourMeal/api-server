const mongoose = require('mongoose');
const n = require('./modelNames');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    spoonId: {
        type: Number,
        required: true,
    },
    vegetarian: {
        type: Boolean,
        required: true,
    },
    vegan: {
        type: Boolean,
        required: true,
    },
    glutenFree: {
        type: Boolean,
        required: true,
    },
    dairyFree: {
        type: Boolean,
        required: true,
    },
    ketogenic: {
        type: Boolean,
        required: true,
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
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            ingredientId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: n.Ingredient,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            spoonId: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
            },
        },
    ],
    instructions: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model(n.Recipe, RecipeSchema);
