// const jwt = require("jsonwebtoken");

// const jwtAuthMiddleware = (req, res, next) => {
//   // Exact the jwt token fromr equest header

//   const token = req.headers.authorization.split(" ");
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     // verify the JWT token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user information to the request object
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// // Function to generate JWT token

// const generateToken = (userData) => {
//   // Generate a new JWT token using user data
//   return jwt.sign(userData, process.env.JWT_SECRET);
// };

// module.exports = { jwtAuthMiddleware, generateToken };
const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // Extract the jwt token from request header
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate JWT token
const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };
