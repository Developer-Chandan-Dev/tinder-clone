import multer from "multer";

// Configure multer for file storage temporarily
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "api/uploads/"); // Store files temporarily in a local directory
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
