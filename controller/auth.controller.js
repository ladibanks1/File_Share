import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;
import authService from "../service/auth.service.js";

// Token Generation
const getToken = async (data, maxAge = "1d") => {
  try {
    const token = await jwt.sign(data, secretKey, {
      expiresIn: maxAge,
    });
    return token;
  } catch (error) {
    return error.message;
  }
};

const signUp = async (req, res, next) => {
  try {
    const data = req.body;
    const createdUser = await authService.signUp(data);
    const token = await getToken({ id: createdUser._id });
    res.status(201).json({
      data: createdUser,
      token,
      message: "User Created Successfully",
    });
  } catch (error) {
    const err = {
      status: 400,
      message: error.message,
    };

    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await authService.login(data);
    const token = await getToken({ id: user._id });
    res.status(200).json({
      data: user,
      token,
      message: "Welcome Back",
    });
  } catch (error) {
    const err = {
      status: 400,
      message: error.message,
    };
    console.log(err);
    next(err);
  }
};

export default {
  signUp,
  login,
};
