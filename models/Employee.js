const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String, // Added to store email
    subject: String, // Added to store subject
    message: String, // Added to store message
});

// Export the Employee model
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
