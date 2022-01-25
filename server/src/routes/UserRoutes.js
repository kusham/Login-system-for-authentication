const express = require('express');
const { signUp, signIn, deleteUser, refresh } = require('../controllers/User');
const verify = require('../middleware/UserAuth');
const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/refresh', refresh);
router.delete('/:id', verify, deleteUser);

module.exports = router;