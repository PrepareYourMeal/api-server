const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    spoon_id: {
        type: String,
        required: true
    },
    vegetarian: {
        type: Boolean,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    },
    glutenFree: {
        type: Boolean,
        required: true
    },
    dairyFree: {
        type: Boolean,
        required: true
    },
    ketogenic: {
        type: Boolean,
        required: true
    },
    preparationMinutes: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    sourceUrl: {
        type: String,
        required: true
    },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ingredients',
            required: true
        }
    ],
    instructions: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

module.exports = Recipe = mongoose.model('recipes', RecipeSchema)