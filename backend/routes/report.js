const express = require('express');
const multer = require('multer');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Storage engine for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST complaint
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newComplaint = new Complaint({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      rollNumber: req.body.rollNumber,
      message: req.body.message,
      location: req.body.location,
      bullyingType: req.body.bullyingType,
      status: req.body.status,
      knowPerson: req.body.knowPerson === 'true', // since formData sends as string
      privacy: req.body.privacy,
      accusedName: req.body.accusedName || null,
      accusedRollNumber: req.body.accusedRollNumber || null,
      accusedYear: req.body.accusedYear || null,
      accusedDepartment: req.body.accusedDepartment || null,
      image: req.file ? `uploads/${req.file.filename}` : null
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).json({ error: 'Failed to save complaint' });
  }
});

// GET complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

module.exports = router;
