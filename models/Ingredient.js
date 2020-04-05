const mongoose = require('mongoose');

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

module.exports = mongoose.model('ingredient', IngredientSchema);
