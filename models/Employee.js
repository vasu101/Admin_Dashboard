const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: { type: Number, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    image: { type: String },
    joiningDate: { type: Date, default: Date.now },
});

employeeSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    const lastEmployee = await Employee.findOne().sort({ employeeId: -1 });
    this.employeeId = lastEmployee ? lastEmployee.employeeId + 1 : 1;

    next();
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;