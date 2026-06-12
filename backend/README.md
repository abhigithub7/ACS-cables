# Ashish Computers E-Commerce Backend

Complete backend API for Ashish Computers e-commerce store with customer authentication.

## Features

- ✅ Customer Registration with Email Validation
- ✅ Secure Login with JWT Authentication
- ✅ Password Hashing with bcryptjs
- ✅ Profile Management
- ✅ Change Password Functionality
- ✅ Protected Routes with Middleware
- ✅ MongoDB Database Integration
- ✅ CORS Support
- ✅ Comprehensive Error Handling

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing
- **Environment:** dotenv for configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn package manager

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Edit `.env` file with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/ashish_computers
   PORT=3000
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   Server will run on `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### 1. Register Customer
- **Endpoint:** `POST /auth/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123",
    "confirmPassword": "SecurePassword123",
    "phone": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "100001",
      "country": "USA"
    }
  }
  ```
- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Customer registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "customer": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "address": {...},
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  }
  ```
- **Status Code:** 201 (Created)

#### 2. Login Customer
- **Endpoint:** `POST /auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "customer": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      ...
    }
  }
  ```
- **Status Code:** 200 (OK)

#### 3. Get Current Customer Profile
- **Endpoint:** `GET /auth/me`
- **Access:** Private (Requires JWT Token)
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Response (Success):**
  ```json
  {
    "success": true,
    "customer": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      ...
    }
  }
  ```
- **Status Code:** 200 (OK)

#### 4. Update Customer Profile
- **Endpoint:** `PUT /auth/update-profile`
- **Access:** Private (Requires JWT Token)
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Request Body:**
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "9876543210",
    "address": {
      "street": "456 Oak Ave",
      "city": "Boston",
      "state": "MA",
      "zipCode": "020001"
    }
  }
  ```
- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "customer": {...}
  }
  ```
- **Status Code:** 200 (OK)

#### 5. Change Password
- **Endpoint:** `PUT /auth/change-password`
- **Access:** Private (Requires JWT Token)
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Request Body:**
  ```json
  {
    "currentPassword": "SecurePassword123",
    "newPassword": "NewSecurePassword456",
    "confirmPassword": "NewSecurePassword456"
  }
  ```
- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Password changed successfully"
  }
  ```
- **Status Code:** 200 (OK)

#### 6. Logout Customer
- **Endpoint:** `POST /auth/logout`
- **Access:** Private (Requires JWT Token)
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Response (Success):**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```
- **Status Code:** 200 (OK)

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Status Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials or token)
- `404` - Not Found (route not found)
- `500` - Internal Server Error

### Example Error Responses

**Invalid Email:**
```json
{
  "success": false,
  "message": "Please provide a valid email"
}
```

**Password Mismatch:**
```json
{
  "success": false,
  "message": "Passwords do not match"
}
```

**Unauthorized Access:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

## Project Structure

```
backend/
├── Controllers/
│   └── authController.js       # Authentication logic
├── Model/
│   └── Customer.js              # Customer schema & model
├── Routes/
│   └── authRoutes.js            # Authentication routes
├── Middleware/
│   └── auth.js                  # JWT verification middleware
├── index.js                     # Main server file
├── .env                         # Environment variables
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Security Best Practices

1. **Password Security:**
   - Minimum 6 characters (can be increased)
   - Hashed using bcryptjs (10 salt rounds)
   - Never stored or returned in plain text

2. **JWT Token:**
   - Expires after 7 days (configurable)
   - Verified for all protected routes
   - Stored in request header

3. **Email Validation:**
   - Unique email constraint in database
   - Email format validation
   - Case-insensitive storage

4. **Data Validation:**
   - All inputs validated before processing
   - Phone number format validation
   - Address completeness validation

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   mongod
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and database
3. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ashish_computers?retryWrites=true&w=majority
   ```

## Future Enhancements

- [ ] Forgot Password & Reset Email
- [ ] Email Verification
- [ ] Social Login (Google, Facebook)
- [ ] Two-Factor Authentication
- [ ] Refresh Token Rotation
- [ ] Admin Panel
- [ ] Product Management
- [ ] Order Management
- [ ] Payment Integration
- [ ] Review & Rating System
- [ ] Wishlist Feature
- [ ] Email Notifications

## Scripts

```bash
# Start development server with auto-reload
npm start

# Run tests (when tests are added)
npm test
```

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access if using Atlas

**JWT Token Error:**
- Ensure token is in `Authorization: Bearer <token>` format
- Check if token has expired
- Verify JWT_SECRET matches in .env

**CORS Error:**
- Update CORS_ORIGIN in .env with your frontend URL
- Ensure credentials: true is set in frontend requests

## Support

For issues or questions, contact the development team.

---

**Last Updated:** January 2025
**Version:** 1.0.0
**Author:** Abhinay
