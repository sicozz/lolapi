import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const image = multer({ storage });

export default {
  image,
};
