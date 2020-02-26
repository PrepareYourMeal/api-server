const mongoose = require('mongoose');
const n = require('./modelNames');

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    spoon_id: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model(n.Ingredient, IngredientSchema);
