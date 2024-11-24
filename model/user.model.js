import { Schema, SchemaTypes, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name must be Provided"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email must be Provided"],
    validate: [validator.isEmail, "Please Provide a valid Email"],
  },
  password: {
    type: String,
    minLength: [6, "Password must be more than six characters"],
    required: [true, "Password must be Provided"],
  },
  history: [
    {
      type: SchemaTypes.ObjectId,
      ref: "shared_file",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = model("User", UserSchema);

export default User;
