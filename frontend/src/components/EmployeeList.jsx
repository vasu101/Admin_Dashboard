import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditEmployeeModal from './EditEmployeeModal';
import '../styles/EmployeeList.css';

const EmployeeList = ({ employees, handleDelete, refreshEmployeeList }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Initialize the selected employee state
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee for editing
    setShowEditModal(true); // Open the edit modal
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Joining Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employeeId}</td> 
              <td>
                <img
                  src={employee.image || '/path/to/default/image.png'}
                  alt={employee.username}
                  style={{ width: '50px', borderRadius: '50%' }}
                />
              </td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
              <td>
                <div className="action-buttons">
                  <Button variant="light" className="mr-2" onClick={() => handleEditClick(employee)}>
                    Edit
                  </Button>
                  <Button variant="dark" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Employee Modal */}
      {selectedEmployee && (
        <EditEmployeeModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          employee={selectedEmployee} // Pass selected employee to the modal
          refreshEmployeeList={refreshEmployeeList}
        />
      )}
    </div>
  );
};

export default EmployeeList;
