const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');

// Set express router
const router = express.Router();

// Import user model
const User = require('../../models/User');

// router.get()
router.get('/', auth, async (req, res) => {
    try {
        // const user = await User.findById();
        const authToken = req.query.token;
        const user = await User.findOne({ authToken });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).send('User not found');
        }
        res.status(500).send('Server Error');
    }
});

// POST api/users
// Register user
// access - Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // check if user exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // get user gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            user = new User({
                name,
                email,
                avatar,
                password,
            });

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // return JWT
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error...');
        }
    }
);

router.get('/:token/favourites', auth, async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ authToken: token });

        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user.favourites);
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/favourites',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.favourites.unshift(recipe);
            await user.save();
            res.status(200).send('Favourites updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/favourites/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.favourites.map(item => item.spoon_id).indexOf(recId);
        user.favourites.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted favourites');
    } catch (e) {
        console.log(e);
    }
});

router.get('/:token/inventory', auth, async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ authToken: token });

        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user.inventory);
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/inventory',
    [
        auth,
        [
            check('ingredients', 'Ingredients is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { ingredients } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.inventory.unshift(ingredients);
            await user.save();
            res.status(200).send('Ingredients updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/inventory/:ing_id', auth, async (req, res) => {
    const { token } = req.params;
    const ingId = req.params.ing_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.inventory.map(item => item.spoon_id).indexOf(ingId);
        user.inventory.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted ingredients');
    } catch (e) {
        console.log(e);
    }
});

router.get('/:token/planner', auth, async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ authToken: token });

        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user.planner);
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/planner/monday',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.planner.monday.unshift(recipe);
            await user.save();
            res.status(200).send('Monday updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/planner/monday/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.planner.monday.map(item => item.spoon_id).indexOf(recId);
        user.planner.monday.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted monday');
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/planner/tuesday',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.planner.tuesday.unshift(recipe);
            await user.save();
            res.status(200).send('Tuesday updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/planner/tuesday/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.planner.tuesday.map(item => item.spoon_id).indexOf(recId);
        user.planner.tuesday.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted tuesday');
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/planner/wednesday',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.planner.wednesday.unshift(recipe);
            await user.save();
            res.status(200).send('Wednesday updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/planner/wednesday/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.planner.wednesday.map(item => item.spoon_id).indexOf(recId);
        user.planner.wednesday.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted wednesday');
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/planner/thursday',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.planner.thursday.unshift(recipe);
            await user.save();
            res.status(200).send('Thursday updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/planner/thursday/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.planner.thursday.map(item => item.spoon_id).indexOf(recId);
        user.planner.thursday.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted thursday');
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/planner/friday',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.planner.friday.unshift(recipe);
            await user.save();
            res.status(200).send('Friday updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/planner/friday/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.planner.friday.map(item => item.spoon_id).indexOf(recId);
        user.planner.friday.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted friday');
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/planner/saturday',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.planner.saturday.unshift(recipe);
            await user.save();
            res.status(200).send('Saturday updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/planner/saturday/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.planner.saturday.map(item => item.spoon_id).indexOf(recId);
        user.planner.saturday.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted saturday');
    } catch (e) {
        console.log(e);
    }
});

router.put(
    '/:token/planner/sunday',
    [
        auth,
        [
            check('recipe', 'Recipe is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        try {
            const { recipe } = req.body;
            const user = await User.findOne({ authToken: token });

            if (!user) {
                return res.status(404).send('User not found');
            }
            user.planner.sunday.unshift(recipe);
            await user.save();
            res.status(200).send('Monday updated');
        } catch (e) {
            console.log(e);
        }
    }
);

router.delete('/:token/planner/sunday/:rec_id', auth, async (req, res) => {
    const { token } = req.params;
    const recId = req.params.rec_id;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const removeIndex = user.planner.sunday.map(item => item.spoon_id).indexOf(recId);
        user.planner.sunday.splice(removeIndex, 1);
        await user.save();
        res.status(200).send('Deleted monday');
    } catch (e) {
        console.log(e);
    }
});

router.get('/:token/planner/grocery', auth, async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ authToken: token });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const ingredients = [];
        for (let i = 0; i < user.planner.monday.length; i++) {
            const arr = user.planner.monday[i].ingredients;
            for (let j = 0; j < arr.length; j++) {
                ingredients.push(arr[j]);
            }
        }

        for (let i = 0; i < user.planner.tuesday.length; i++) {
            const arr = user.planner.tuesday[i].ingredients;
            for (let j = 0; j < arr.length; j++) {
                ingredients.push(arr[j]);
            }
        }

        for (let i = 0; i < user.planner.wednesday.length; i++) {
            const arr = user.planner.wednesday[i].ingredients;
            for (let j = 0; j < arr.length; j++) {
                ingredients.push(arr[j]);
            }
        }

        for (let i = 0; i < user.planner.thursday.length; i++) {
            const arr = user.planner.thursday[i].ingredients;
            for (let j = 0; j < arr.length; j++) {
                ingredients.push(arr[j]);
            }
        }

        for (let i = 0; i < user.planner.friday.length; i++) {
            const arr = user.planner.friday[i].ingredients;
            for (let j = 0; j < arr.length; j++) {
                ingredients.push(arr[j]);
            }
        }

        for (let i = 0; i < user.planner.saturday.length; i++) {
            const arr = user.planner.saturday[i].ingredients;
            for (let j = 0; j < arr.length; j++) {
                ingredients.push(arr[j]);
            }
        }

        for (let i = 0; i < user.planner.sunday.length; i++) {
            const arr = user.planner.sunday[i].ingredients;
            for (let j = 0; j < arr.length; j++) {
                ingredients.push(arr[j]);
            }
        }

        const flags = [];
        const output = [];
        for (let i = 0; i < ingredients.length; i++) {
            if (flags[ingredients[i].spoon_id]) continue;
            flags[ingredients[i].spoon_id] = true;
            output.push(ingredients[i]);
        }

        for (let i = 0; i < user.inventory.length; i++) {
            for (let j = 0; j < output.length; j++) {
                if (output[j].spoon_id === user.inventory[i].spoon_id) {
                    const removeIndex = output.map(item => item.spoon_id).indexOf(output[j].spoon_id);
                    output.splice(removeIndex, 1);
                }
            }
        }

        // user.grocery = output;
        // user.save();
        res.json(output);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
