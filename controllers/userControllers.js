 const User = require("../models/user.models")
 const bcrypt = require('bcryptjs')
 
 const register = async (req, res) => {
    try {
        const user = new User(req.body);
        user.hashepassword = bcrypt.hashSync(user.password, 10)
        await user.save();
        res.status(201).json({ message: req.t('userRegistered'), user });
      } catch (error) {
        res.status(500).json({ message: req.t('server_error') });
      }
 }
  
const login =  async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.validPassword(req.body.password))) {
          return res.status(401).json({ message: req.t('invalidCredentials') });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        res.status(500).json({ message: req.t('server_error') });
      }
  };

module.exports = {register,login}