const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy
const JWTStrategy = require('passport-jwt').Strategy
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt
const bcrypt = require("bcrypt")
const { JWT_SECRET } = require("../config/keys")
exports.localStrategy = new LocalStrategy({ usernameField: "username" },
    async (username, password, done) => {
        try {
            const foundUser = await User.findOne(
                { username: username }
                ,)
            if (!foundUser) { return done(null, false) }
            const passwordMatch = await bcrypt.compare(password, foundUser.password)
            if (!passwordMatch) { return done(null, false) }
            return done(null, foundUser)
        } catch (error) {
            return done(error)
        }
    })
exports.jwtStrategy = new JWTStrategy(
    {
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
        if (Date.now() > jwtPayload.exp * 1000) {
            return done(null, false);
        }
        try {
            const foundUser = User.findById(jwtPayload._id)
            if (!foundUser) { done(null, false) }
        } catch (error) {
            done(error)

        }
    }
);
