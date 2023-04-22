import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../models/user.model";

import { LoginInput, RegisterInput } from "../schema/user.schema";
import createError from "../utils/createError";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.EXPIRES_IN;

const register = async (
  req: Request<{}, {}, RegisterInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return next(
        createError(422, 1, "User already exists, please login instead")
      );

    const newUser = new User({
      ...req.body,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User has been created.",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (
  req: Request<{}, {}, LoginInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select(
      "+password"
    );
    if (!user) return next(createError(401, 5, "User not found"));

    const passMatch = await user.comparePassword(req.body.password);

    if (!passMatch) {
      return next(createError(401, 3, "Email and password don't match."));
    }

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      jwtSecret!,
      {
        expiresIn: EXPIRES_IN,
      }
    );

    const { password, ...info } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        token,
        user: info,
      });
  } catch (err) {
    next(err);
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    success: true,
    message: "signed out",
  });
};

export default { register, login, logout };
