const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import CORS package

const app = express();

// Enable CORS for all routes
app.use(cors());
// Set the storage location and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath); // Save to the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp + original file extension
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({
    message: 'File uploaded successfully.',
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`
  });
});

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to list files in the uploads directory with pagination
app.get('/files', (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10;  // Default to 10 files per page if not provided
  const uploadPath = path.join(__dirname, 'uploads');

  // Read the contents of the uploads directory
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Could not list the files.' });
    }

    // Sort files by name (optional) and paginate
    const sortedFiles = files.sort((a, b) => a.localeCompare(b));  // Optional sorting
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedFiles = sortedFiles.slice(startIndex, endIndex);

    // Respond with paginated list of files
    res.json({
      page,
      limit,
      totalFiles: files.length,
      totalPages: Math.ceil(files.length / limit),
      files: paginatedFiles.map(file => ({
        name: file,
        url: `/uploads/${file}`
      }))
    });
  });
});


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
