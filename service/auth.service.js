import User from "../model/user.model.js";
import dbError from "../utils/dbError.utils.js";

const signUp = async (data) => {
  try {
    const createUser = await User.create(data);
    return createUser;
  } catch (error) {
    const err = dbError(error);
    if (err === undefined || null || err.length === 0) throw error;
    throw err[0];
  }
};

const login = async (data) => {
  try {
    const { email, password } = data;
    const user = await User.login(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};


export default {
  signUp,
  login,
};
