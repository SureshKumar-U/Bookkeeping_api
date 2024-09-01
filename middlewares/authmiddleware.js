const jwt = require('jsonwebtoken');
const User = require('../models/user.models');


const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: req.t('unauthorized') });
  }

  const token = authHeader.split(' ')[1].trim();
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: req.t('forbidden') });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: req.t('unauthorized') });
      }

      req.user = user; // Attach the user to the request object
      next();
    } catch (error) {
      res.status(500).json({ message: req.t('server_error') });
    }
  });
};

const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: req.t('forbidden') });
  }
  next();
};

module.exports = { checkAuth, checkRole };
