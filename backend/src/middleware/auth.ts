import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token-manager";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await verifyToken(req, res, next);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.jwtData) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userRole = res.locals.jwtData.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};
