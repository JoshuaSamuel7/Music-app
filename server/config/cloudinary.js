const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'nono',
            resource_type: 'auto',  // This handles both images and audio
            allowed_formats: ['jpeg', 'png', 'jpg', 'mp3','wav'],  // Use 'allowed_formats' instead of 'allowedFormats'
            transformation: [{ width: 500, height: 500, crop: "fill" }]
        };
    },
}
);

const upload = multer({ storage: storage });
module.exports = upload;
