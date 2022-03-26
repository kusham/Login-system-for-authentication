const express = require('express');
const { signUp, signIn, deleteUser, refresh, logOut } = require('../controllers/User');
const verify = require('../middleware/UserAuth');
const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post("/logout/:id", verify, logOut);
router.post('/refresh', refresh);
router.delete('/:id', verify, deleteUser);

module.exports = router;