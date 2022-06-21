const router = require('express').Router();
const multer = require('multer');

// setting the storage
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now()+'-'+file.originalname);
    }
});

var upload = multer({storage:storage});

// form file at the root of the upload
router.get('/upload', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/upload.html'));
})

// single upload
router.post('/upload', upload.single('image'), (req,res) => {
	try {
		console.log(req.file);
		res.send(req.file);
	} catch (error) {
		res.status(500).send(error);
	}
})

// bulk upload [maximum 10]
router.post('/upload/bulk', upload.array('image',10), (req,res) => {
	try {
		console.log(req.file);
		res.send(req.files);
	} catch (error) {
		res.status(500).send(error);
	}
})

module.exports = router;