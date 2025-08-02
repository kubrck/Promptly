import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { COOKIE_NAME } from "./constants";
import { VerifyErrors } from "jsonwebtoken";
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Secret key is not defined in environment variables.");
  }
  const token = jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  try {
    // Using JWT_SECRET as the environment variable name
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Secret key is not defined in environment variables.");
    }
    const success = await jwt.verify(token, secret);
    res.locals.jwtData = success;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token Expired" });
  }
};
