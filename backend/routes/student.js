// This file defines the Express router for handling student-related API endpoints.
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST route to add a new student
router.post('/', async (req, res) => {
  try {
    const { name, rollNumber, email, mobile } = req.body;
    
    // Check if a student with the same roll number or email already exists
    const existingStudent = await Student.findOne({ $or: [{ rollNumber }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ msg: 'Student with this roll number or email already exists' });
    }

    const newStudent = new Student({ name, rollNumber, email, mobile });
    await newStudent.save();
    res.status(201).json({ msg: 'Student added successfully', student: newStudent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET route to get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ dateJoined: -1 });
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export the router module
module.exports = router;
