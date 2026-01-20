const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storageForm = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = './public/uploads/others';
    const ext = path.extname(file.originalname).toLowerCase();

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      if (file.fieldname.startsWith('projectImage')) folder = './public/uploads/projectImages';
      else if (file.fieldname.startsWith('memberImage')) folder = './public/uploads/memberImages';
    } else if (['.mp4', '.mov', '.avi'].includes(ext)) {
      folder = './public/uploads/videos';
    } else if (['.pdf'].includes(ext)) {
      folder = './public/uploads/pdfs';
    } else if (['.ppt', '.pptx'].includes(ext)) {
      folder = './public/uploads/ppts';
    }

    ensureDir(folder);
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + Math.floor(Math.random() * 1000) + path.extname(file.originalname));
  },
});

const uploadFormFiles = multer({
  storage: storageForm,
  limits: { fileSize: 1024 * 1024 * 100 }, // 100MB max
});

module.exports = { uploadFormFiles };
