#overview

This is a full-stack Next.js authentication system using MongoDB as the backend database, JWT (JSON Web Tokens) for authentication and authorization, and Nodemailer with Mailcatcher for sending verification emails.

#System Components

    #Backend
    
    - Handles user registration and login requests
    - Validates user input and stores user data in MongoDB
    - Generates and verifies JWT tokens for authentication
    - Sends verification emails using Nodemailer and Mailcatcher

    #Frontend (Next.js)

    - Handles user interactions with the application
    - Handles authentication and authorization using JWT tokens
    - Displays user data and allows users to update their profiles
    
    #MongoDB (Database)

    - Stores user data and other application data
    - Nodemailer (Email Library)
    - Sends verification emails to users after registration

    #Mailcatcher (Email Catcher)

    - Catches and displays incoming emails for testing and debugging purposes



#Setup

    To set up the system, follow these steps:

    - Clone the repository and navigate to the project directory.
    - Run npm install to install all dependencies.
    - Create a new MongoDB database and update the mongodb variable in .env (MONGODB_URI) to point to your database.
    - Update the nodemailer settings in .env to match your email server settings.
    - Run <code>npm run dev</code> to start the development server.

    
