# MERN Admin Dashboard

## Project Overview

This is a **MERN (MongoDB, Express.js, React.js, Node.js)** stack-based **Admin Dashboard** for employee management. The dashboard allows you to:

- Add, edit, delete, and search employees.
- View employee details such as name, email, mobile number, designation, gender, and more.
- Perform client-side and server-side validations.
- Use a modal-based interface for employee addition and editing.

## Features

- **Authentication**: Allows users to log in and view personalized content.
- **Employee Management**: 
  - Add employee details such as name, email, mobile, and designation.
  - Edit or delete existing employee records.
  - Search employees by name or email.
- **Real-Time Search**: Live search functionality to filter the employee list.
- **Responsive UI**: Built with Bootstrap for a responsive and user-friendly interface.

## Technologies Used

### Frontend:
- **React.js**: JavaScript library for building user interfaces.
- **Axios**: For making API requests to the backend.
- **Bootstrap**: For responsive design and styling.

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js to build APIs.
- **MongoDB**: NoSQL database to store employee data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Cors**: Middleware to enable Cross-Origin Resource Sharing.
- **Nodemon**: For automatically restarting the server during development.

## Project Structure

project-root
├── ├── routes/
│   │   └── employee.js      # API routes for employee management
│   ├── models/
│   │   └── Employee.js      # Mongoose schema for employees
│   ├── server.js            # Main backend server file
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # Header with search functionality
│   │   │   ├── EmployeeList.jsx   # Employee list table
│   │   │   ├── AddEmployeeModal.jsx # Modal for adding employees
│   │   │   └── EditEmployeeModal.jsx # Modal for editing employees
│   │   ├── pages/
│   │   │   └── Dashboard.jsx      # Dashboard with employee functionalities
│   │   ├── styles/
│   │   │   └── Dashboard.css      # CSS for dashboard
│   │   └── App.js                 # Main React App component
│   └── package.json               # Frontend dependencies


## Prerequisite
- **Node.js**: Install from [Node.js official website](https://nodejs.org/).
- **MongoDB**: You can use MongoDB locally or MongoDB Atlas for cloud-based storage.
- **npm**: Comes with Node.js for managing packages.

## Setup and Installation

### Backend Setup
1. Install Dependencies using `npm install`.
2. Run the backend server using **nodemon** `npm run dev`.

### Frontend Setup
1. Navigate to frontend directory `cd frontend`.
2. Install Dependencies using `npm install`.
3. Start the frontend development server `npm run dev`.

## API Endpoints

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/api/employee/show` | Fetch all employees            |
| POST   | `/api/employee/add`  | Add a new employee             |
| PUT    | `/api/employee/:id`  | Update an employee by ID       |
| DELETE | `/api/employee/:id`  | Delete an employee by ID       |

## Project Features in Detail

### 1. Employee Search Functionality
The search bar in the header allows users to search for employees by username or email. The search input is sent to the Dashboard.jsx, which filters the employee list in real-time.

### 2. Add and Edit Employee Modal
The app uses modals for adding and editing employee details. The AddEmployeeModal and EditEmployeeModal components use forms to input employee data, and React state management to handle form submissions.

### 3. Delete Functionality
Each employee row in the table has a delete button. When clicked, it sends a DELETE request to the backend to remove the employee from the database.

### 4. Employee ID
Employees are assigned an auto-incremented employeeId instead of the default MongoDB ObjectID for easier readability and management.

## Dependencies

### Frontend
- **React**: For building the user interface.
- **Axios**: For HTTP requests.
- **React-Bootstrap**: For UI components.
- **React-Router-DOM**: For navigation.

### Backend
- **Express**: For creating APIs.
- **Mongoose**: For MongoDB object modeling.
- **Cors**: To allow cross-origin requests.
- **Nodemon**: For automatically restarting the backend during 
development.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to open an issue or a pull request.
