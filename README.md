# Authentication API using Express and MongoDB

This project provides a simple API for user authentication (sign up and login) using Node.js, Express, MongoDB, bcrypt for password hashing, and JWT for token-based authentication. CORS is also enabled to handle cross-origin requests.

## Features

- User Signup (with email, username, first name, and last name)
- User Login (with email/username and password)
- JWT-based authentication
- Password hashing using bcrypt
- MongoDB for data storage

## Prerequisites

- Node.js (version 14.x or later)
- MongoDB (running locally or a cloud-based MongoDB like MongoDB Atlas)
- npm (Node Package Manager)

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/MuhammadArslan118/auth-server.git
cd auth-api
```

### .env

- MONGO_URI=mongodb://localhost:27017/yourdbname
- JWT_SECRET=your_secret_key
- PORT=5000
