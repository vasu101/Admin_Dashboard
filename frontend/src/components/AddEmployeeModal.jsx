import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const AddEmployeeModal = ({ show, handleClose, refreshEmployeeList }) => {
  const [employeeData, setEmployeeData] = useState({
    username: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeData({ ...employeeData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!employeeData.designation || !employeeData.course || !employeeData.gender) {
        setErrorMessage('Please select a designation, course, and gender.');
        return;
    }

    try {
        const response = await axiosInstance.post('/api/employee/add', employeeData);
        setSuccessMessage('Employee added successfully!');
        refreshEmployeeList(); // Refresh the employee list in the parent component
        resetForm();
    } catch (error) {
        console.error('Error adding employee:', error);
        if (error.response && error.response.status === 400) {
            setErrorMessage('Employee with this email already exists.');
        } else {
            setErrorMessage('Error adding employee. Please try again.');
        }
    }
};


  const resetForm = () => {
    setEmployeeData({
      username: '',
      email: '',
      mobile: '',
      designation: '',
      gender: '',
      course: '',
      image: '',
    });
  };

  const handleCloseModal = () => {
    resetForm();
    setErrorMessage('');
    setSuccessMessage('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={employeeData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMobile">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="number"
              name="mobile"
              value={employeeData.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDesignation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              as="select"
              name="designation"
              value={employeeData.designation}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div className="gender-radio-group">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  checked={employeeData.gender === 'Male'}
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  checked={employeeData.gender === 'Female'}
                  onChange={handleChange}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Other"
                  name="gender"
                  value="Other"
                  checked={employeeData.gender === 'Other'}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>
          <Form.Group controlId="formCourse">
            <Form.Label>Course</Form.Label>
            <Form.Control
              as="select"
              name="course"
              value={employeeData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSC">BSC</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Form.Group>

          <Button variant="dark mt-2" type="submit">
            Add Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeModal;
