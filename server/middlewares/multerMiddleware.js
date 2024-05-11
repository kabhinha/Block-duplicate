// Import required dependencies
const multer = require('multer');

// Define the storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the directory where uploaded files will be stored (change this to match your project's directory structure).
    cb(null, '../Imagery');
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file (you can customize this if needed).
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

// Configure multer middleware with the specified storage and limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

// Export the configured multer middleware for use in your routes
module.exports = upload;
