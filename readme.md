Portal Project README

Welcome to the documentation for my Portal Project! This project is a web portal built using various technologies, including Express.js, Mongoose, Connect Flash, Express Session, Passport, Nodemailer, and EJS. The portal allows users to register for courses, receive course confirmation emails, login to edit their information, and delete their account.

Features

User Registration: Users can sign up for the portal using their email and password. Their registration data is securely stored in the database.

Course Registration: Registered users can choose and register for courses available in the portal.

Email Confirmation: Upon successful course registration, users receive an email confirmation containing details of the registered course.

User Authentication: The portal uses Passport for user authentication, ensuring secure access to user-specific features.

Profile Editing: Logged-in users can edit their profile information, such as email and password.

Account Deletion: Users can delete their accounts, and a confirmation email is sent to their registered email address.

Installation
Clone this repository: git clone https://github.com/your-username/portal-project.git
Navigate to the project directory: cd portal-project
Install dependencies: npm install

Configuration
Set up your MongoDB database connection in config/database.js.
Configure your email service provider settings for Nodemailer in config/nodemailer.js.

Usage
Run the application: npm start
Access the portal in your web browser: http://localhost:5000
Dependencies
Express.js: Web application framework.
Mongoose: MongoDB object modeling for Node.js.
Connect Flash: Middleware for displaying flash messages.
Express Session: Middleware for managing user sessions.
Passport: Authentication middleware for Node.js.
Nodemailer: Library for sending emails.
EJS: Templating engine for generating HTML markup.
File Structure
app.js: Entry point of the application.
config/: Contains configuration files (database, nodemailer, passport).
models/: Defines Mongoose models for the database.
routes/: Defines routes and controllers for various parts of the application.
views/: Contains EJS templates for rendering HTML pages.
public/: Static assets (stylesheets, scripts, images).
middlewares/: Custom middleware functions.
controllers/: Logic for handling route requests.
helpers/: Utility functions and helper modules.
Credits
Created by Agboola Akorede Ibrahim
Email: ibrahim4grace@gmail.com
