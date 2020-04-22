const { Router } = require('express');
const User = require('../models/User');

const router = Router();

router.get('/loginhistory', async (req, res) => {
    if (req.user.username !== 'robchinadmin') {
        return res.status(404).json({ msg: 'You are not authorized' });
    }

    const allUsers = await User.find({}).exec();
    const userLoginDtData = allUsers.map(({ username, latestLoginDate, registeredDate }) => ({ username, latestLoginDate, registeredDate }));

    return res.json(userLoginDtData);
});

module.exports = router;
