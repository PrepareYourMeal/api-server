const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import relevant models
const User = require('../../models/User');

// GET api/profile/me
// GET current user profile
// access Private
router.get('/me', async (req, res) => {
    try {
        const profile = await User.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST api/profile
// Create user profile
// access Private
router.post(
    '/',
    [
        [
            check('tags', 'You need to add your preferred tags')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { tags } = req.body;

        // Build Profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.planner = {};
        profileFields.planner.monday = [];
        profileFields.planner.tuesday = [];
        profileFields.planner.wednesday = [];
        profileFields.planner.thursday = [];
        profileFields.planner.friday = [];
        profileFields.planner.saturday = [];
        profileFields.planner.sunday = [];
        profileFields.inventory = [];
        profileFields.grocery = [];
        profileFields.favourites = [];

        let tagsArray;

        if (tags) {
            tagsArray = tags.split(' ').map(tag => tag.trim());
        }

        if (tagsArray.length > 5) {
            return res.status(400).json({ msg: 'Sorry, you can just add 5 preferred tags' });
        }

        profileFields.tags = tagsArray;

        try {
            let profile = User.findOne({ user: req.user.id });
            if (profile) {
                // update
                profile = await User.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }

            // create profile
            profile = new User(profileFields);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
