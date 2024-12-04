
Video Hosting Website Backend (Similar to YouTube)
This project is a complete backend solution for a video hosting website similar to YouTube, built using modern web technologies like Node.js, Express.js, MongoDB, Mongoose, JWT, and bcrypt. It includes a wide range of features that any comprehensive backend system should have.

Project Overview
This backend project is designed to handle all essential functionalities of a video hosting platform, such as:

User Registration & Authentication: With features like signup, login, password hashing using bcrypt, and JWT-based authentication (access tokens and refresh tokens).
Video Upload & Management: Users can upload videos, manage their video content, and interact with videos.
Like/Dislike: Users can like or dislike videos to show their preferences.
Comments and Replies: Users can comment on videos and reply to others' comments.
Subscriptions: Users can subscribe and unsubscribe from other channels.
User Profile: Users have customizable profiles with a profile picture, cover image, and other details.
Key Features
JWT Authentication: Secure user authentication using JWT tokens for login and protected routes.
Refresh Tokens: Automatically refresh tokens using refresh tokens, ensuring users don't need to re-login after token expiry.
Password Encryption: Use of bcrypt to securely hash and compare passwords.
Database Schema: MongoDB and Mongoose are used to handle user data, video content, comments, likes, dislikes, subscriptions, and more.
RESTful API: Fully functional API built using Express.js, enabling CRUD operations on users, videos, comments, and subscriptions.
Error Handling: Standardized error responses using custom error handling.
Security: Implemented security practices like cookie-based authentication (HTTP-only cookies), environment variables, and input validation.
Technologies Used
Node.js: A JavaScript runtime for building server-side applications.
Express.js: A minimal and flexible Node.js web application framework.
MongoDB: A NoSQL database to store user data, video information, comments, likes, and subscriptions.
Mongoose: A MongoDB ODM (Object Data Modeling) library to interact with the database.
JWT (JSON Web Token): Used for secure authentication via access tokens and refresh tokens.
bcrypt: For hashing user passwords securely before storing them in the database.
dotenv: For managing environment variables like database URI, JWT secret keys, and more.
cookie-parser: For handling cookies used to store authentication tokens.
Features and Functionalities
User Authentication: Register, login, password hashing, JWT-based authentication (access and refresh tokens).
Video Upload: Allows users to upload video content to the platform.
Likes & Dislikes: Users can like or dislike videos.
Comments & Replies: Users can leave comments on videos and reply to others’ comments.
Subscriptions: Users can subscribe to channels and receive updates when new videos are uploaded.
Profile Management: Users can update their profile information and avatar.
JWT & Refresh Tokens: Secure user sessions with JWT and refresh tokens for session persistence.
