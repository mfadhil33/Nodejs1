const multer = require('multer');
const util = require('util');

const DIR = './resources/uploads';
const diskStorage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: diskStorage }).single('fupload');
// util.promisify(upload);

const fileUpload = util.promisify(upload);

module.exports = fileUpload;
