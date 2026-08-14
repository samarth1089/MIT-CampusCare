const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body;
    
    // Check if student already exists
    const existingStudent = await Student.findOne({ name });
    if (existingStudent) {
      return res.status(400).json({ success: false, error: 'Student name already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new student
    const newStudent = new Student({
      name,
      password: hashedPassword
    });
    
    await newStudent.save();
    
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    
    // Find student
    const student = await Student.findOne({ name });
    if (!student) {
      return res.status(400).json({ success: false, error: 'Student not found' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid password' });
    }
    
    // Return safe user info
    res.json({
      success: true,
      user: {
        name: student.name,
        role: student.role,
        createdAt: student.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
