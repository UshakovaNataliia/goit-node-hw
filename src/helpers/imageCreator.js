const path = require("path");
const multer = require("multer");
const id = require('nanoid')

const storage = multer.diskStorage({
    destination: "src/public/images",
    filename: function (req, file, cb) {
        const ext = path.parse(file.originalname).ext;
        cb(null, id.nanoid(3) + ext);
    },
});

const upload = multer({ storage });

exports.imageCreator = upload.single("avatar");