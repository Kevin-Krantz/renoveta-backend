import jwt from "jsonwebtoken";

const auth = (req: any, res: any, next: any) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

export default auth;
