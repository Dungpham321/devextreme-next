const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const decodedPath = decodeURIComponent(req.params.PATH);
    const uploadDir = path.join(__dirname, '..', decodedPath);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9-_]/g, '');
    const ext = path.extname(file.originalname);
    let fileName = originalName + ext;
    const decodedPath = decodeURIComponent(req.params.PATH);
    const uploadDir = path.join(__dirname, '..', decodedPath);
    let counter = 0;

    while (fs.existsSync(path.join(uploadDir, fileName))) {
      counter++;
      fileName = `${originalName}_${counter}${ext}`;
    }

    cb(null, fileName);
  }
});

const upload = multer({ storage });

module.exports = upload;