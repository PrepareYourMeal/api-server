const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//Import Recipe and Ingredient Model
const Ingredient = require('../../models/Ingredient');
const Recipe = require('../../models/Recipe');

// GET api/recipes
// GET all recipes
// access - Public
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ title: -1 })
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST api/recipes
// create a new recipe
// access - public
router.post('/', [
    check('title', 'Recipe Title is required').not().isEmpty(),
    check('spoon_id', 'Recipe Spoonacular ID is required').not().isEmpty(),
    check('vegetarian', 'Recipe Vegetarian property is required').isBoolean(),
    check('vegan', 'Recipe Vegan property is required').isBoolean(),
    check('glutenFree', 'Recipe Gluten Free property is required').isBoolean(),
    check('dairyFree', 'Recipe Dairy Free property is required').isBoolean(),
    check('ketogenic', 'Recipe Ketogenic property is required').isBoolean(),
    check('preparationMinutes', 'Recipe Preparation Time is required').isNumeric(),
    check('servings', 'Recipe Serving Number is required').isNumeric(),
    check('sourceUrl', 'Recipe Source URL is required').isURL(),
    check('imageUrl', 'Recipe Image URL is required').isURL(),
    check('ingredients', 'Recipe Ingredients are required').not().isEmpty(),
    check('instructions', 'Recipe Instructions is required').not().isEmpty(),
    check('tags', 'Recipe tags are required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const ingredient_list = []
        for (let i = 0; i < req.body.ingredients.length; i++) {
            rec_ingredient = req.body.ingredients[i]
            spoon = rec_ingredient.spoon_id
            // console.log(rec_ingredient.spoon_id)
            ingredient = await Ingredient.findOne({ spoon_id: spoon })
            if (!ingredient) {
                const newIngredient = new Ingredient({
                    name: rec_ingredient.name,
                    spoon_id: rec_ingredient.spoon_id
                });
                const newIngred = await newIngredient.save();
                const ingredObj = {
                    ingredient_id: newIngred.id,
                    name: newIngred.name,
                    spoon_id: newIngred.spoon_id,
                    quantity: rec_ingredient.quantity
                };
                ingredient_list.push(ingredObj);
            } else {
                const ingredObj = {
                    ingredient_id: ingredient.id,
                    name: ingredient.name,
                    spoon_id: ingredient.spoon_id,
                    quantity: rec_ingredient.quantity
                };
                ingredient_list.push(ingredObj);
            }
        }
        const newRecipe = new Recipe({
            title: req.body.title,
            spoon_id: req.body.spoon_id,
            vegetarian: req.body.vegetarian,
            vegan: req.body.vegan,
            glutenFree: req.body.glutenFree,
            dairyFree: req.body.dairyFree,
            ketogenic: req.body.ketogenic,
            preparationMinutes: req.body.preparationMinutes,
            servings: req.body.servings,
            sourceUrl: req.body.sourceUrl,
            imageUrl: req.body.imageUrl,
            ingredients: ingredient_list,
            instructions: req.body.instructions,
            tags: req.body.tags
        });

        const recipe = await newRecipe.save();
        res.json(recipe);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// PUT recipes
// DEL recipes

// GET api/recipes/:id
// get recipe by id
// access - Public
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).send('Recipe not found');
        }
        res.status(500).send('Server Error');
    }
});


router.get('/', (req, res) => res.send('Recipes route'));

module.exports = router;