const User = require("../models/user.models")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: req.t("all_fields_are_mandatory") })
    }
    if (role != "Author" && role != "Borrower") {
      return res.status(400).json({ message: req.t("invalid_role") })

    }
    const existedUser = await User.findOne({ email: email })
    if (existedUser) {
      return res.status(400).json({ message: req.t("user_already_existed") })
    }
    const hashedpassword = bcrypt.hashSync(password, 10)
    const user = await User.create({ name, email, password: hashedpassword, role });
    res.status(201).json({ message: req.t('userRegistered'), user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: req.t('server_error') });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: req.t("all_fields_are_mandatory") })

    }

    const user = await User.findOne({ email :email });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: req.t('invalidCredentials') });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({message: req.t("login_successful") ,token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: req.t('server_error') });
  }
};

module.exports = { register, login }