import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'uploads/')
    },

    filename : (req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype  = allowedTypes.test(file.mimetype);

    if(extName && mimetype){
        return cb(null,true)
    }else{
        return cb(new Error('Only image are allowed (jpeg,jpg,png)'),false)
    }
}

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
})

export default upload;