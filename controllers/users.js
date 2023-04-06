require('dotenv').config();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user')

// @desc Create new user
// @route POST /register
// @access Private
exports.createUser = async (req, res, next) => {
  try {
    // get user input
    const { first_name, last_name, email, password } = req.body;

    // validate user input
    if (!(email && password && first_name && last_name)) res.status(400).send('All inputs is required!');

    // check if user already exist
    const oldUser = await User.findOne({ email });
    if (oldUser) res.status(409).send('User already exist. Please, login!');

    // encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in our DB
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: '5h' }
    );

    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false })
  }
}

// @desc login user
// @route POST /login
// @access Private
exports.loginUser = async (req, res, next) => {
  try {
    // get user input
    const { email, password } = req.body

    // validate user input
    if (!(email && password)) res.status(400).send('All inputs is required!')

    // check if user already exist
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: '5h' }
      )

      // save user token
      user.token = token

      // retrn user
      res.status(200).json(user)
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false })
  }
}

// @desc Welcome Page
// @route GET /welcome
// @access Public
exports.getPage = async (req, res, next) => {
  try {
    await res.status(200).send('Welcome page')
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, mesage: 'Page not found!' })
  }
}