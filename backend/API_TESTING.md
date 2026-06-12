# API Testing Guide

This guide helps you test the authentication API endpoints using cURL or Postman.

## Quick Start Testing

### 1. Register a New Customer

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123",
    "phone": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "100001",
      "country": "USA"
    }
  }'
```

**Using Postman:**
1. Create new POST request to `http://localhost:3000/api/auth/register`
2. Set Header: `Content-Type: application/json`
3. Paste the JSON body in the Body tab
4. Click Send

### 2. Login

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

Save the returned `token` for protected routes testing.

### 3. Get Current User Profile (Protected Route)

**Using cURL:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Replace `YOUR_TOKEN_HERE`** with the token from login response.

### 4. Update Profile

**Using cURL:**
```bash
curl -X PUT http://localhost:3000/api/auth/update-profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "9876543211",
    "address": {
      "street": "456 Oak Ave",
      "city": "Boston",
      "state": "MA",
      "zipCode": "020001",
      "country": "USA"
    }
  }'
```

### 5. Change Password

**Using cURL:**
```bash
curl -X PUT http://localhost:3000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "currentPassword": "SecurePass123",
    "newPassword": "NewSecurePass456",
    "confirmPassword": "NewSecurePass456"
  }'
```

### 6. Logout

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Ashish Computers API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@example.com\",\"password\":\"SecurePass123\",\"confirmPassword\":\"SecurePass123\",\"phone\":\"9876543210\",\"address\":{\"street\":\"123 Main St\",\"city\":\"New York\",\"state\":\"NY\",\"zipCode\":\"100001\",\"country\":\"USA\"}}"
            },
            "url": {"raw": "http://localhost:3000/api/auth/register", "protocol": "http", "host": ["localhost"], "port": ["3000"], "path": ["api", "auth", "register"]}
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"john@example.com\",\"password\":\"SecurePass123\"}"
            },
            "url": {"raw": "http://localhost:3000/api/auth/login", "protocol": "http", "host": ["localhost"], "port": ["3000"], "path": ["api", "auth", "login"]}
          }
        },
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "header": [
              {"key": "Authorization", "value": "Bearer {{token}}"}
            ],
            "url": {"raw": "http://localhost:3000/api/auth/me", "protocol": "http", "host": ["localhost"], "port": ["3000"], "path": ["api", "auth", "me"]}
          }
        }
      ]
    }
  ],
  "variable": [
    {"key": "token", "value": ""}
  ]
}
```

## Environment Variables in Postman

1. Create new Environment called "Ashish Computers"
2. Add variables:
   - `base_url`: http://localhost:3000
   - `token`: (empty - will be filled after login)

3. In requests, use `{{base_url}}` and `{{token}}` instead of hardcoded values

## Storing Token from Response

In Postman, after Login request:
1. Go to "Tests" tab
2. Add script:
   ```javascript
   var jsonData = pm.response.json();
   pm.environment.set("token", jsonData.token);
   ```
3. The token will be automatically saved and used in other requests

## Common Test Scenarios

### Scenario 1: New User Registration Flow
1. Register → Get token
2. Get Profile using token
3. Update Profile
4. Logout

### Scenario 2: Login Validation
1. Try login with wrong password → Should fail
2. Try login with non-existent email → Should fail
3. Login with correct credentials → Should succeed

### Scenario 3: Protected Routes
1. Try accessing /me without token → Should fail (401)
2. Try accessing /me with invalid token → Should fail (401)
3. Access /me with valid token → Should succeed

### Scenario 4: Password Management
1. Register user
2. Change password with wrong current password → Should fail
3. Change password with mismatched new passwords → Should fail
4. Change password successfully
5. Login with new password → Should succeed
6. Login with old password → Should fail

## Validation Rules to Test

| Field | Min | Max | Pattern |
|-------|-----|-----|---------|
| firstName | 1 | 50 | Text only |
| lastName | 1 | 50 | Text only |
| email | - | - | Valid email format |
| password | 6 | - | Any characters |
| phone | - | - | 10 digits |
| zipCode | - | - | 6 digits |

## Expected Error Responses

**Invalid Email Format:**
```json
{
  "success": false,
  "message": "Please provide a valid email"
}
```

**Duplicate Email:**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Invalid Phone (not 10 digits):**
```json
{
  "success": false,
  "message": "Please provide a valid 10-digit phone number"
}
```

**Missing Required Fields:**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

**Invalid Token:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

## Tips for Testing

1. **Use Environment Variables:** Store base_url and token in Postman environments
2. **Save Responses:** Each successful response updates environment variables
3. **Test Validation:** Try invalid inputs to verify error handling
4. **Test Edge Cases:** Empty fields, very long inputs, special characters
5. **Check Status Codes:** Verify correct HTTP status codes are returned
6. **Validate Response Format:** Ensure all responses have success and message fields

## Performance Notes

- Register: ~100-200ms (due to password hashing)
- Login: ~100-200ms (due to password verification)
- Get Profile: ~10-20ms
- Update Profile: ~20-30ms
- Change Password: ~100-200ms

---

For more details, see [API Documentation](./README.md)
