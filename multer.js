const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = require('./s3')

const storage = multerS3({
    s3:s3,
    bucket:process.env.bucket,
    acl:'bucket-owner-full-control',
    contentType:multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
})

const upload =  multer({storage:storage})

module.exports = upload