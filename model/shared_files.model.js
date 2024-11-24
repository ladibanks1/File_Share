import { Schema, SchemaTypes, model } from "mongoose";
import validator from "validator";

const { isEmail } = validator;
const sharedFile = new Schema({
  sender_id: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "Please Specify Your mail"],
  },
  recipient: {
    type: String,
    validate: [isEmail, "Please Provide a valid Email"],
    required: [true, "Please Specify The recipient mail"],
  },
  files: [{
    type: String,
    required: [true, "Please Specify The File"],
  }],
  message: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const shared_file = model("shared_file", sharedFile);

export default shared_file;
