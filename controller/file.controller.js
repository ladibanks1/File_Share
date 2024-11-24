import fileService from "../service/file.service.js";
import ErrorMessage from "../utils/errorMessage.utils.js";

const uploadFile = async (req, res, next) => {
  try {
    if (req?.files?.length > 0) {
      const data = {
        recipient: req.body.recipient,
        sender: req.body.sender,
        files: req.files.map((file) => file.path),
        message: req.body.message,
      };
      const sharedFile = await fileService.uploadFile(data);
      console.log(sharedFile);
      res.status(200).json({
        message: "Sent Succesfully",
        sharedFile,
      });
    } else {
      throw new ErrorMessage("File not found", 404);
    }
  } catch (error) {
    const err = new ErrorMessage(
      error.message,
      error?.code || error?.statusCode || 400
    );
    next(err);
  }
};

const downloadFile = async (req, res, next) => {
  try {
    const file = await fileService.downloadFile(req.params.id);
    res.status(200).json({
      message: "File Downloaded",
      file,
    });
  } catch (error) {
    const err = new ErrorMessage(
      error.message,
      error?.code || error?.statusCode || 400
    );
    next(err);
  }
};

const history = async (req, res, next) => {
  try {  
    const history = await fileService.history(req.decode.id);
    console.log(history);
    res.status(200).json({
      message: "User History",
      history,
    });
  } catch (error) {
    const err = new ErrorMessage(
      error.message,
      error?.code || error?.statusCode || 400
    );
    next(err);
  }
};

export default {
  uploadFile,
  downloadFile,
  history,
};
