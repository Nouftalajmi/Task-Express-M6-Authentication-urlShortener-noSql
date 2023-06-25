const User = require('../../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET, JWT_EXPIRATION_MS } = require('../../config/keys');

require('dotenv').config()

exports.signin = async (req, res) => {
  try {
    const token = createToken(req.user)
    return res.status(204).json({ token })
  } catch (err) {
    res.status(500).json('Server Error');
  }


}
  ;

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,

  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" })
  return token
}
const hashedPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword;
}
exports.signup = async (req, res, next) => {

  try {
    const { password } = req.body;
    req.body.password = await hashedPassword(password);
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser)
    return res.status(201).json(token);
  } catch (err) {

    next(err)
  }

};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('urls');
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};
