import React, { useState, useEffect, useRef } from 'react';
import EmployeeList from '../components/EmployeeList';
import AddEmployeeModal from '../components/AddEmployeeModal';
import axiosInstance from '../axiosInstance';
import Header from '../components/Header';
import '../styles/Dashboard.css';

const Dashboard = ({ username }) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const employeeListRef = useRef(null);

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get('api/employee/show');
      setEmployees(response.data);
      setFilteredEmployees(response.data); 
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle deleting an employee
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`api/employee/${id}`);
      fetchEmployees(); 
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle searching for employees
  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(employee =>
        employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered); 
    }
  };

  // Scroll to employee list section
  const scrollToEmployeeList = () => {
    if (employeeListRef.current) {
      employeeListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dashboard">
      {/* Header with search functionality */}
      <Header 
        isLoggedIn={true} 
        username={username} 
        handleSearch={handleSearch} 
      />

      <div className="welcome-message">
        <h1>Welcome, {username}!</h1>
        <div className="button-container">
          <button className="action-button" onClick={() => setShowModal(true)}>Add Employee</button>
          <button className="action-button" onClick={scrollToEmployeeList}>View Employee List</button>
        </div>
      </div>
      
      <div ref={employeeListRef}>
      <EmployeeList
        employees={filteredEmployees}
        handleDelete={handleDelete}
        refreshEmployeeList={fetchEmployees} 
      />
      </div>
      
      <AddEmployeeModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        refreshEmployeeList={fetchEmployees} 
      />
    </div>
  );
};

export default Dashboard;
