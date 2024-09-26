import React, { useState, useEffect, useRef } from 'react';
import EmployeeList from '../components/EmployeeList';
import AddEmployeeModal from '../components/AddEmployeeModal';
import axiosInstance from '../axiosInstance';
import '../styles/Dashboard.css';

const Dashboard = ({ username }) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const employeeListRef = useRef(null);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get('api/employee/show');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`api/employee/${id}`);
      fetchEmployees(); // Refresh employee list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Function to scroll to employee list
  const scrollToEmployeeList = () => {
    if (employeeListRef.current) {
      employeeListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard">
      <div className="welcome-message">
        <h1>Welcome, {username}!</h1>
        <div className="button-container">
          <button className="action-button" onClick={() => setShowModal(true)}>Add Employee</button>
          <button className="action-button" onClick={scrollToEmployeeList}>View Employee List</button> 
        </div>
      </div>

      {/* Employee List Section */}
      <div ref={employeeListRef}>
        <EmployeeList employees={employees} handleDelete={handleDelete} />
      </div>
      
      {/* Add Employee Modal */}
      <AddEmployeeModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        refreshEmployeeList={fetchEmployees} 
      />
    </div>
  );
};

export default Dashboard;
