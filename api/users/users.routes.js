const express = require('express');
const router = express.Router();
const { signup, signin, getUsers } = require('./users.controllers');
const passport = require("passport")
// const { localStrategy } = require("../../middleware/passport")


router.post('/signup', signup);
router.post('/signin', passport.authenticate("local", { session: false }), signin);
router.get('/users', getUsers);

module.exports = router;
