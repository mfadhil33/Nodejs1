const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Acces denied');

  try {
    const verify = jwt.verify(token, process.env.TOKEN_RAHASIA);
    req.user = verify;
    next();
  } catch (error) {
    res.status(400).json(JSON.stringify({ message: 'invalid token  ' }));
  }
};

module.exports = { auth };
