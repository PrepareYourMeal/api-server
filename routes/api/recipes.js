const express = require('express');
const router = express.Router();

// GET recipes
// POST recipes
// PUT recipes
// DEL recipes
// GET recipe by id
// GET recipe by vegan
// GET recipe by vegetarian
// GET recipe by glutenFree
// GET recipe by dairyFree
// GET recipe by ketogenic
// GET recipe with prep time less than {options}
// GET recipe by tags
// GET recipe by servings more than {options}

router.get('/', (req, res) => res.send('Recipes route'));

module.exports = router;