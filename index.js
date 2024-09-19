const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/Employee"); // Adjust the path as needed
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public')); 

// Set EJS as the view engine
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/company')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Render homepage
app.get("/", (req, res) => {
    res.render("index");
});

// Additional routes for different pages
app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/about_us", (req, res) => {
    res.render("about us"); // Ensure you have the correct EJS file name
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/gallery", (req, res) => {
    res.render("gallery");
});

// Handle form submission from the contact form
app.post('/generate', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).send({ message: 'Invalid input' });
        }

        let employee = new Employee({
            name: name,
            email: email,
            subject: subject,
            message: message,
        });

        await employee.save();
        console.log('Employee saved:', employee.toJSON());

        // Redirect to the homepage after saving
        res.redirect('/contact');
    } catch (err) {
        console.error('Error saving employee:', err.message);
        res.status(500).send({ message: 'Error saving employee' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
