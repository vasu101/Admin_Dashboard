const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee.js');

// Route to add a new employee
router.post('/add', async (req, res) => {
    const { username, email, mobile, designation, gender, course, image } = req.body;

    try {
        // Check if an employee with the same email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        // Create a new employee
        const newEmployee = new Employee({
            username,
            email,
            mobile,
            designation,
            gender,
            course,
            image,
        });

        await newEmployee.save();

        res.status(201).json(newEmployee); 
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Error adding employee', error: error.message });
    }
});

// Fetch Employees
router.get('/show', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});
// Route to update an existing employee
router.put('/:id', async (req, res) => {
    const { username, email, mobile, designation, gender, course, image } = req.body;
  
    try {
      // Find the employee by ID and update their details
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        { username, email, mobile, designation, gender, course, image },
        { new: true } // Return the updated employee data
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
  });
  

module.exports = router;
