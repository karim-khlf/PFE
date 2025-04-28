import multer from 'multer'
import path from 'path'
// Configure Multer storage (you can also skip this to store in memory)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // make sure this folder exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // pdf filter
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed!'), false);
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  
  export default upload
  