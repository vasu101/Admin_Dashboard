import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditEmployeeModal from './EditEmployeeModal';
import '../styles/EmployeeList.css';

const EmployeeList = ({ employees, handleDelete, refreshEmployeeList }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for editing
  const [showEditModal, setShowEditModal] = useState(false); // Show/Hide edit modal
  const [sortOrder, setSortOrder] = useState('asc'); // Track sorting order (asc or desc)
  const [sortedEmployees, setSortedEmployees] = useState(employees); // Store sorted employees

  // Handle clicking the edit button for a specific employee
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  // Handle sorting employees by name
  const handleSortByName = () => {
    const sorted = [...sortedEmployees].sort((a, b) => {
      const nameA = a.username.toLowerCase();
      const nameB = b.username.toLowerCase();

      if (sortOrder === 'asc') {
        return nameA > nameB ? 1 : -1;
      } else {
        return nameA < nameB ? 1 : -1;
      }
    });

    setSortedEmployees(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  // Update sortedEmployees when employees prop changes
  React.useEffect(() => {
    setSortedEmployees(employees);
  }, [employees]);

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th onClick={handleSortByName} style={{ cursor: 'pointer' }}>
              Name {sortOrder === 'asc' ? '▲' : '▼'} {/* Indicate sort order */}
            </th>
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
          {sortedEmployees.map((employee) => (
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
                  <Button
                    variant="light"
                    className="mr-2"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="dark"
                    onClick={() => handleDelete(employee._id)}
                  >
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
          employee={selectedEmployee}
          refreshEmployeeList={refreshEmployeeList}
        />
      )}
    </div>
  );
};

export default EmployeeList;
