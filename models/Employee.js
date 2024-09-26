const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    image: { type: String },
    joiningDate: { type: Date, default: Date.now }, // Automatically set to current date
});

// If using auto-incrementing IDs, consider using a plugin like mongoose-sequence
module.exports = mongoose.model('Employee', employeeSchema);
