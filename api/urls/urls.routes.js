const express = require('express');

const router = express.Router();
const passport = require('passport');
const { shorten, redirect, deleteUrl } = require('./urls.controllers');


router.post('/shorten/:userId', passport.authenticate("jwt", { session: false }), shorten);
router.get('/:code', redirect);
router.delete('/:code', passport.authenticate('jwt', { session: false }), deleteUrl);

module.exports = router;
