const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Check if there's a token in the request header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Get token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = decoded.userId; // Attach the user ID to the request object
      next(); // Allow the request to continue
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
