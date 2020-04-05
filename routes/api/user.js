const { Router } = require('express');
const User = require('../../models/User');
const Recipe = require('../../models/Recipe');

const router = Router();

/**
 * PATCH favorite: Add one recipe to user favorite
 */
router.patch('/:userId/favorite', async (req, res) => {
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
