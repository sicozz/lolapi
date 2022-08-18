import multer from 'multer';

const imageStorage = multer.diskStorage({
  destination: './uploads/images',
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const image = multer({ storage: imageStorage });

const xlsxStorage = multer.diskStorage({
  destination: './uploads/xlsx',
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const xlsx = multer({ storage: xlsxStorage });

export default {
  image,
  xlsx,
};
