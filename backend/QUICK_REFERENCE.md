# Quick Reference - Backend API

## 🚀 Getting Started (2 Steps)

```bash
npm install        # Install dependencies
npm start          # Start server on port 3000
```

## 📍 Base URL
```
http://localhost:3000/api
```

## 🔑 API Endpoints Quick Map

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /auth/register | ❌ | Create new account |
| POST | /auth/login | ❌ | Login & get token |
| GET | /auth/me | ✅ | Get profile |
| PUT | /auth/update-profile | ✅ | Update profile |
| PUT | /auth/change-password | ✅ | Change password |
| POST | /auth/logout | ✅ | Logout |

## 🔒 Authentication Header
```
Authorization: Bearer <your_jwt_token>
```

## 📝 Register Request
```json
POST /auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "password": "Pass123",
  "confirmPassword": "Pass123",
  "phone": "9876543210",
  "address": {
    "street": "123 St",
    "city": "NYC",
    "state": "NY",
    "zipCode": "100001",
    "country": "USA"
  }
}
```

## 🔓 Login Request
```json
POST /auth/login
{
  "email": "john@test.com",
  "password": "Pass123"
}
```

## ✅ Response Format
```json
{
  "success": true,
  "message": "Success message",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "customer": { /* data */ }
}
```

## ❌ Error Format
```json
{
  "success": false,
  "message": "Error description"
}
```

## 📊 HTTP Status Codes
| Code | Meaning |
|------|---------|
| 201 | Created (register success) |
| 200 | OK (success) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (auth error) |
| 404 | Not Found |
| 500 | Server Error |

## 🔐 Validation Rules

| Field | Rules |
|-------|-------|
| firstName | 1-50 characters |
| lastName | 1-50 characters |
| email | Valid email format, unique |
| password | Min 6 characters |
| phone | Exactly 10 digits |
| zipCode | Exactly 6 digits |

## 🗄️ Database Schema

**Collection:** customers

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,          // unique
  password: String,       // hashed
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## ⚙️ Environment Variables

```bash
MONGODB_URI=mongodb://localhost:27017/ashish_computers
PORT=3000
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## 🧪 Quick Test (cURL)

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe",...}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Pass123"}'

# Get Profile (replace TOKEN)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## 📦 Dependencies

```json
{
  "express": "5.2.1",
  "mongoose": "9.6.1",
  "jsonwebtoken": "9.1.2",
  "bcryptjs": "2.4.3",
  "cors": "2.8.6",
  "dotenv": "17.4.2",
  "nodemon": "3.1.14"
}
```

## 🐛 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| ECONNREFUSED | MongoDB not running | Start mongod |
| Port 3000 in use | Another app using port | Change PORT in .env |
| CORS error | Wrong frontend URL | Update CORS_ORIGIN |
| Invalid token | Expired or wrong token | Re-login to get new token |
| Duplicate email | Email already registered | Use different email |

## 🎯 Common Tasks

### Get Token
```bash
# Login and save token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"Pass123"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

echo $TOKEN
```

### Access Protected Route
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Update Profile
```bash
curl -X PUT http://localhost:3000/api/auth/update-profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","phone":"9876543211"}'
```

## 📚 Full Documentation

- **API Details:** See `README.md`
- **Setup Guide:** See `SETUP_GUIDE.md`
- **Testing Guide:** See `API_TESTING.md`
- **Architecture:** See `ARCHITECTURE.md`

## 🚀 Production Deployment

1. Set environment variables in production
2. Use strong JWT_SECRET
3. Configure CORS_ORIGIN for your domain
4. Use MongoDB Atlas for database
5. Set NODE_ENV=production
6. Use environment-specific .env files

## 📱 Frontend Integration

```javascript
// Register
const response = await fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

// Login
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();
localStorage.setItem('token', token);

// Authenticated request
const response = await fetch('http://localhost:3000/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** January 2025
