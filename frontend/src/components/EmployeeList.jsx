import React from 'react';
import { Table, Button } from 'react-bootstrap';

const EmployeeList = ({ employees, handleDelete }) => {
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
              <td>{employee._id}</td> 
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
              <td variant="grid gap-0 column-gap-3">
                <Button variant="light" onClick={() => console.log(`Edit ${employee._id}`)}>Edit</Button>
                <Button variant="dark" onClick={() => handleDelete(employee._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
