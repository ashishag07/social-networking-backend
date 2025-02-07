import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(path.resolve(), "src", "public", "images", "postUpload")
    );
  },

  filename: function (req, file, cb) {
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});

export const postImageUpload = multer({ storage: storage });
