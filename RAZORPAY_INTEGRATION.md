# Razorpay Payment Integration - Complete Implementation Guide

## Overview

This document explains the complete end-to-end Razorpay payment integration for the A Computers e-commerce platform, covering both backend and frontend implementation.

## Architecture

```
Frontend (React)
    ↓
CheckoutPage Component
    ↓
API Client (api.js)
    ↓
Backend (Express.js)
    ↓
Payment Controller
    ↓
Razorpay API
```

## Backend Implementation

### 1. Models Updated

#### Payment Model (`backend/Model/Payment.js`)
- **New Fields:**
  - `order`: Reference to Order (required, unique per order)
  - `user`: Reference to User (required)
  - `razorpay_order_id`: Unique Razorpay order ID
  - `razorpay_payment_id`: Razorpay payment ID
  - `razorpay_signature`: Signature for verification
  - `amount`: Payment amount
  - `currency`: Payment currency (default: INR)
  - `status`: Payment status (created, captured, failed, refunded)
  - `method`: Payment method (razorpay, cod, upi)
  - `error`: Error message if any
  - `timestamps`: Creation and update timestamps

#### Order Model (`backend/Model/Order.js`)
- **New/Updated Fields:**
  - `paymentMethod`: Updated enum (razorpay, cod, upi) - default: cod
  - `paymentStatus`: Payment status (pending, completed, failed, refunded)
  - `payment`: Reference to Payment document
  - `status`: Updated enum with new values (pending, confirmed, processing, shipped, delivered, cancelled)
  - `notes`: Optional order notes

### 2. Payment Controller (`backend/Controllers/paymentController.js`)

#### Functions:

**`createRazorpayOrder(req, res)`**
- Creates a Razorpay order for payment
- **Request Body:**
  ```json
  {
    "amount": 10000,
    "orderId": "order_mongodb_id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "razorpayOrderId": "order_xxx",
      "amount": 1000000,
      "currency": "INR",
      "paymentId": "payment_mongodb_id"
    }
  }
  ```
- **Features:**
  - Validates order exists and belongs to user
  - Creates Razorpay order with proper amount conversion (rupees → paise)
  - Saves payment record to database
  - Links payment to order

**`verifyPaymentSignature(req, res)`**
- Verifies Razorpay payment signature
- **Request Body:**
  ```json
  {
    "razorpay_order_id": "order_xxx",
    "razorpay_payment_id": "pay_xxx",
    "razorpay_signature": "signature_xxx",
    "orderId": "order_mongodb_id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Payment verified successfully",
    "data": {
      "payment": {
        "id": "payment_id",
        "status": "captured"
      },
      "order": { /* populated order */ }
    }
  }
  ```
- **Security:**
  - Uses HMAC-SHA256 for signature verification
  - Compares with Razorpay secret key
  - Updates payment status only if signature valid
  - Updates order status to "confirmed"

**`getPaymentDetails(req, res)`**
- Retrieves payment details by payment ID
- **Authorization:** User must own the payment

**`getPaymentByOrderId(req, res)`**
- Retrieves payment by order ID
- **Authorization:** User must own the order

### 3. Payment Routes (`backend/Routes/payment.js`)

```
POST /api/v1/payments/create-order        - Create Razorpay order
POST /api/v1/payments/verify-signature    - Verify payment signature
GET  /api/v1/payments/:paymentId          - Get payment details
GET  /api/v1/payments/order/:orderId      - Get payment by order
```

All routes require authentication via JWT token in header.

### 4. Updated Order Controller (`backend/Controllers/orderController.js`)

**Key Changes:**
- `createOrder()`: Sets proper initial status based on payment method
- `getUserOrders()`: Populates payment details
- `getOrderById()`: Includes payment information
- `cancelOrder()`: Handles payment refunds
- Better error handling and validation

### 5. Environment Variables (`backend/.env`)

```env
# Razorpay Configuration
# Get these from https://dashboard.razorpay.com/app/settings/api-keys
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_SECRET=rzp_test_your_secret_here
```

**⚠️ Important:** 
- Use TEST keys for development
- Never commit real keys to version control
- Use production keys only on production servers

## Frontend Implementation

### 1. API Endpoints (`frontend/src/api.js`)

New Payment API functions:

```javascript
createPaymentOrder(amount, orderId)
  - Creates payment order on backend
  - Returns Razorpay order details

verifyPaymentSignature(paymentData)
  - Verifies payment signature after successful payment
  - Updates order status

getPaymentDetails(paymentId)
  - Retrieves payment details

getPaymentByOrderId(orderId)
  - Retrieves payment for a specific order
```

### 2. Updated CheckoutPage Component

**Key Features:**

**Form Validation:**
- All shipping fields required
- Email validation
- Phone number validation (10 digits)

**Payment Methods:**
1. **Razorpay:**
   - Loads Razorpay SDK dynamically
   - Creates order on backend first
   - Opens Razorpay modal
   - Verifies signature on success
   - Updates order status to "confirmed"

2. **Cash on Delivery (COD):**
   - Order created with "pending" payment status
   - Status: "confirmed"
   - Can be paid later

**Flow:**

```
User fills form
    ↓
Validate form
    ↓
Create Order in DB
    ↓
Branch:
  ├─ COD: Show success → redirect
  └─ Razorpay:
      ├─ Load Razorpay script
      ├─ Create payment on backend
      ├─ Open payment modal
      └─ On success:
          ├─ Verify signature
          ├─ Update payment status
          ├─ Update order status
          ├─ Clear cart
          └─ Redirect to order details
```

### 3. Environment Variables (`frontend/.env`)

```env
VITE_RAZORPAY_KEY=rzp_test_your_key_id_here
VITE_API_BASE=http://localhost:9000/api/v1
```

**Note:** Only KEY_ID is needed on frontend (not secret)

## Complete Payment Flow

### Scenario 1: Razorpay Payment

```
1. User fills checkout form
2. Clicks "Place Order"
3. Backend creates order with paymentStatus: "pending"
4. Frontend calls createPaymentOrder API
5. Backend creates Razorpay order, saves Payment record
6. Razorpay modal opens on frontend
7. User completes payment
8. Razorpay returns: order_id, payment_id, signature
9. Frontend calls verifyPaymentSignature API
10. Backend verifies signature using HMAC-SHA256
11. If valid:
    - Update Payment status: "captured"
    - Update Order status: "confirmed", paymentStatus: "completed"
    - Return updated order
12. Frontend shows success message
13. Cart cleared, redirect to order details
```

### Scenario 2: Cash on Delivery

```
1. User fills checkout form
2. Selects "Cash on Delivery"
3. Clicks "Place Order"
4. Backend creates order with:
   - paymentStatus: "pending"
   - status: "confirmed"
   - paymentMethod: "cod"
5. No Razorpay payment happens
6. Frontend shows success message
7. Cart cleared, redirect to order details
8. Admin can process payment when order is delivered
```

## Security Features

1. **Signature Verification:**
   - Uses HMAC-SHA256 with Razorpay secret
   - Prevents tampering with payment data

2. **User Authorization:**
   - All payment routes require JWT token
   - Users can only access their own orders/payments
   - Backend validates order ownership

3. **Price Verification:**
   - Backend calculates total from DB product prices
   - Never trusts client-sent prices
   - Prevents price manipulation attacks

4. **Amount Conversion:**
   - Properly converts rupees to paise (×100)
   - Prevents decimal point vulnerabilities

5. **Database Integrity:**
   - Payment linked to Order
   - Order linked to User
   - Proper relationships maintained

## Testing Guide

### Setup for Testing

1. **Get Razorpay Test Keys:**
   - Go to https://dashboard.razorpay.com/app/settings/api-keys
   - Copy TEST KEY_ID and SECRET
   - Add to backend/.env

2. **Frontend Setup:**
   - Add TEST KEY_ID to frontend/.env

3. **Test Cards (Razorpay provides):**
   - Success: 4111111111111111
   - Failure: 4000000000000002
   - Use any future expiry and any CVV

### Test Cases

**Test 1: Create Order (COD)**
```
POST /api/v1/payments/create-order
Body: { amount: 1000, orderId: "xxx" }
Expected: Success with razorpayOrderId
```

**Test 2: Verify Signature (Valid)**
```
POST /api/v1/payments/verify-signature
Body: {
  razorpay_order_id: "order_xxx",
  razorpay_payment_id: "pay_xxx",
  razorpay_signature: "valid_signature"
}
Expected: Success, order status updated
```

**Test 3: Verify Signature (Invalid)**
```
POST /api/v1/payments/verify-signature
Body: { ...with wrong signature }
Expected: 400 Error - Invalid payment signature
```

**Test 4: Checkout with Razorpay**
- Fill form → Select Razorpay → Place Order
- Use test card to complete payment
- Should redirect to order details

**Test 5: Checkout with COD**
- Fill form → Select COD → Place Order
- Should show success and redirect

## Deployment Checklist

- [ ] Switch to PRODUCTION Razorpay keys
- [ ] Update RAZORPAY_KEY_ID and RAZORPAY_SECRET in backend/.env
- [ ] Update VITE_RAZORPAY_KEY in frontend/.env
- [ ] Set NODE_ENV=production
- [ ] Update CORS_ORIGIN to production domain
- [ ] Enable HTTPS on frontend
- [ ] Test payment flow on production
- [ ] Set up payment success/failure email notifications
- [ ] Configure payment webhooks (optional, for advanced tracking)

## API Response Examples

### Success Response
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "payment": {
      "_id": "60d5ec49c1234567890abcde",
      "status": "captured",
      "razorpay_payment_id": "pay_xxx"
    },
    "order": {
      "_id": "60d5ec49c1234567890abcdf",
      "status": "confirmed",
      "paymentStatus": "completed",
      "totalPrice": 10000,
      "items": []
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid payment signature"
}
```

## Troubleshooting

**Problem: Razorpay SDK not loading**
- Check browser console for CORS errors
- Verify network tab shows checkout.razorpay.com loading
- Clear browser cache

**Problem: Signature verification failing**
- Verify RAZORPAY_SECRET is correct
- Check order_id and payment_id format
- Enable debug logging in backend

**Problem: Order status not updating**
- Check Payment record was created
- Verify signature validation passed
- Check Order update query

**Problem: Payment amount incorrect**
- Verify amount is in rupees (will be converted to paise)
- Check database product prices match frontend
- Verify no decimal issues

## File Changes Summary

| File | Changes |
|------|---------|
| backend/Model/Payment.js | Complete rewrite - added all fields |
| backend/Model/Order.js | Added paymentStatus, payment ref, updated enums |
| backend/Controllers/paymentController.js | NEW - payment logic |
| backend/Routes/payment.js | Complete rewrite - clean routes |
| backend/Controllers/orderController.js | Enhanced with payment support |
| frontend/src/api.js | Added 4 new payment endpoints |
| frontend/src/Components/CheckoutPage.jsx | Major rewrite - payment flow |
| backend/.env | Added Razorpay configuration |
| frontend/.env | Added Razorpay key |

## Next Steps

1. Add payment success/failure email notifications
2. Implement payment refund functionality
3. Add payment webhook for background verification
4. Create admin dashboard for payment management
5. Add payment history page for customers
6. Implement recurring/subscription payments

## Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs for server errors
3. Verify .env variables are set correctly
4. Test with Razorpay test mode first
5. Contact Razorpay support if payment issues persist

---

**Last Updated:** June 7, 2026
**Version:** 1.0.0
