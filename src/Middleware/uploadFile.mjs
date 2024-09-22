import upload from "../Middleware/multer.mjs";

const uploadSingleImage = (fileName ) => {
  return upload.single(fileName);
  next();
};

export default uploadSingleImage;
