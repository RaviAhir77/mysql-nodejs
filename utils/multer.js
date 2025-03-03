import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extName && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error('Only images are allowed (jpeg, jpg, png)'), false);
    }
};

const xlFilter = (req, file, cb) => {
    cb(null, true);
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export const xlUpload = multer({
    storage: storage,
    fileFilter: xlFilter,
});