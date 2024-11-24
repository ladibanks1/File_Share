import shared_file from "../model/shared_files.model.js";
import User from "../model/user.model.js";
import databaseErrors from "../utils/dbError.utils.js";
import transport from "../config/mail.config.js";
const uploadFile = async (data) => {
  const ORIGIN = process.env.ORIGIN || "http://localhost:5173";

  try {
    // Check if Sender is avaliable in the database And if mail is correct
    const sender = await User.findOne({ email: data.sender });

    if (sender === null) {
      throw new Error("Sender email Not Found \n Please SignUp Or Login");
    }
    // FIle Data
    const uploadedFiles = {
      sender_id: sender._id,
      recipient: data.recipient,
      files: data.files,
      message: data.message,
    };

    // Create Files
    const files = await shared_file.create(uploadedFiles);

    // Download Link
    const downloadLink = `${ORIGIN}/download/${files._id}`;

    const mailOptions = {
      from: data.sender,
      to: data.recipient,
      subject: "You received A File From A User Using File Share",
      html: ` <p>You have received files from ${data.sender}.</p><p>Message: ${data.message}</p><p><a href="${downloadLink}">Download your files</a></p>`,
    };
    await transport.sendMail(mailOptions);

    // Check if recipient has an acount
    const recipient = await User.findOne({ email: data.recipient });
    // If recipient has an account add the file to the history
    if (recipient) {
      await User.findByIdAndUpdate(recipient._id, {
        $addToSet: {
          history: files,
        },
      });
    }

    await User.findByIdAndUpdate(sender._id, {
      $addToSet: {
        history: files,
      },
    });

    return files;
  } catch (error) {
    console.log(error);
    const err = databaseErrors(error);
    const message = err?.message || "Something Went Wrong";
    const code = err?.statusCode || err?.code || 400;
    throw { message, code };
  }
};

const downloadFile = async (id) => {
  try {
    const file = await shared_file.findById(id);
    if (!file) {
      throw new Error("File not found");
    }
    return file;
  } catch (error) {
    console.log(error);
    const err = databaseErrors(error);
    const message = err?.message || "Something Went Wrong";
    const code = err?.statusCode || err?.code || 400;
    throw { message, code };
  }
};

const history = async (id) => {
  try {
    const user = await User.findById(id).populate("history");
    if (!user) {
      throw new Error("User not found");
    }
    return user.history;
  } catch (error) {
    console.log(error);
    const err = databaseErrors(error);
    const message = err?.message || "Something Went Wrong";
    const code = err?.statusCode || err?.code || 400;
    throw { message, code };
  }
};
export default {
  uploadFile,
  downloadFile,
  history,
};
