const bcrypt = require('bcryptjs');
// const process = require('process');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validateRegister } = require('../middleware/validateRegister');
const { usersmodels } = require('../models/usersmodels');

dotenv.config();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const getUsername = await usersmodels.findOne({ where: { username } });
    if (!getUsername) res.send('anda belum terdaftar').status(400);
    const getPassword = bcrypt.compareSync(password, getUsername.password);
    if (!getPassword) res.send('username atau password anda salah').status(400);

    // token
    const token = jwt.sign({ username: getUsername.username }, process.env.TOKEN_RAHASIA);

    // res.status(200).send({ message: 'login success' });
    res.header('auth-token', token).send('berhasil login');
  } catch (error) {
    console.error('error');
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // validation form
    const { error } = validateRegister(req.body);
    console.info(error);
    if (error) return res.status(400).json(error);

    // jika validasi nya succes maka siap di simpan
    const salt = bcrypt.genSaltSync();
    const encryptPassword = await bcrypt.hashSync(password, salt);
    // eslint-disable-next-line no-use-before-define, no-shadow, new-cap
    // eslint-disable-next-line no-use-before-define, new-cap
    const user = new usersmodels({
      username,
      password: encryptPassword,
      email,
    });
    // eslint-disable-next-line no-undef
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.error('error');
  }
};

module.exports = { registerUser, login };
