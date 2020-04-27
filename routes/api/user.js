const { Router } = require('express');
const User = require('../../models/User');
const Recipe = require('../../models/Recipe');

const router = Router();

/**
 * GET profile: Get user profile including planner and favorite
 */
router.get('/:userId/profile', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).exec();

    return res.json({ user });
});

/**
 * POST planner: Add new recipe in planner
 */
router.post('/:userId/planner/:day', async (req, res) => {
    const { userId, day } = req.params;
    const { recipeId } = req.body;

    if (!['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day)) {
        return res.status(400).json({ msg: 'The day must be one of [monday, tuesday, wednesday, thursday, friday, saturday, sunday]!' });
    }

    if (!recipeId) {
        return res.status(400).json({ msg: 'No reciep id is found in the request body' });
    }

    const user = await User.findById(userId).exec();
    const recipe = await Recipe.findById(recipeId).exec();

    user.planner[day].unshift(recipe);
    await user.save();

    const updatedUser = await User.findById(userId).exec();
    return res.json({ user: updatedUser });
});

/**
 * DELETE planner: Delete recipe from planner
 */
router.delete('/:userId/planner/:day/:recipeId', async (req, res) => {
    const { userId, day, recipeId } = req.params;

    if (!['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day)) {
        return res.status(400).json({ msg: 'The day must be one of [monday, tuesday, wednesday, thursday, friday, saturday, sunday]!' });
    }

    if (!recipeId) {
        return res.status(400).json({ msg: 'No reciep id is found in the request body' });
    }

    const user = await User.findById(userId).exec();
    const recipe = await Recipe.findById(recipeId).exec();

    if (!recipe) {
        return res.status(400).json({ msg: 'Recipe does not exist' });
    }

    const removedIdx = user.planner[day].map(r => r.id).indexOf(recipeId);
    user.planner[day].splice(removedIdx, 1);
    await user.save();

    const updatedUser = await User.findById(userId).exec();
    return res.json({ user: updatedUser });
});

/**
 * POST favorite: Add one recipe to user favorite
 */
router.post('/:userId/favorite', async (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;

    const user = await User.findById(userId).exec();
    const recipe = await Recipe.findById(recipeId).exec();

    user.favourites.unshift(recipe);
    await user.save();

    const updatedUser = await User.findById(userId).exec();
    return res.json({ user: updatedUser });
});

/**
 * DELETE favorite: Delete one recipe from user favorite
 */
router.delete('/:userId/favorite/:recipeId', async (req, res) => {
    const { userId, recipeId } = req.params;

    const user = await User.findById(userId).exec();
    const recipeIndex = user.favourites.findIndex(r => r.id === recipeId);
    user.favourites.splice(recipeIndex, 1);

    await user.save();
    const updatedUser = await User.findById(userId).exec();

    return res.json({ user: updatedUser });
});

module.exports = router;
