import path from 'node:path';
import { randomBytes } from 'node:crypto';
import multer from 'multer';
import fs from 'node:fs';

const uploadPath = path.resolve('public', 'images', 'profile');

// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  // console.log(`Created upload directory at ${uploadPath}`);
} else {
  // console.log(`Upload directory exists at ${uploadPath}`);
}

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log('Setting destination for file upload');
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileKey = `${randomBytes(16).toString('hex')}-${file.originalname}`;
      console.log(`Generated filename: ${fileKey}`);
      file.key = fileKey;
      cb(null, file.key);
    },
  }),
};

const config = {
  dest: uploadPath,
  storage: storageTypes[process.env.STORAGE_TYPE || 'local'],
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      console.log(`File type ${file.mimetype} is allowed`);
      cb(null, true);
    } else {
      console.error(`File type ${file.mimetype} is not allowed`);
      cb(new Error('Invalid file type.'));
    }
  },
};

export default multer(config);