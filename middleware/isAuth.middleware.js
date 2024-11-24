import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header And Token missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.decode = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default isAuth;
