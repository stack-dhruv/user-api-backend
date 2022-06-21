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
router.get('/api/upload', (req, res) => {
	console.log("/api/upload = GET = result received");
	res.sendFile(path.resolve(__dirname + '/upload.html'));
})

// single upload
router.post('/api/upload', upload.single('image'), (req,res) => {
	try {
		console.log(req.file);
        console.log("/api/upload = POST = result received");
		res.send(req.file);
	} catch (error) {
		res.status(500).send(error);
	}
})

// bulk upload [maximum 10]
router.post('/api/upload/bulk', upload.array('image',10), (req,res) => {
	try {
		console.log(req.file);
        console.log("/api/upload = POST = result received");
		res.send(req.files);
	} catch (error) {
		res.status(500).send(error);
	}
})

module.exports = router;