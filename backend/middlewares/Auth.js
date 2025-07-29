import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }
   const token = authHeader.split(" ")[1];
  try {
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decoded.id;
    next();
  } catch (error) {
    console.error("JWT Authentication Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authUser;
