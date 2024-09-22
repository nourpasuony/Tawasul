import multer, { diskStorage } from "multer";
// import path from "path"

// Multer configuration
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null,"C:/Users/Nourb/OneDrive/Desktop/chatApp nodejs/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
