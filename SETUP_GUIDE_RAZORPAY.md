# Quick Start Guide - Razorpay Payment Integration

## Prerequisites

- Node.js installed
- MongoDB running locally or MongoDB Atlas connection string
- Razorpay account (free) at https://razorpay.com

## Step 1: Get Razorpay Keys

1. Visit https://dashboard.razorpay.com/app/settings/api-keys
2. Copy your TEST Key ID and Secret
3. Keep them safe (never commit to git!)

## Step 2: Backend Setup

```bash
cd backend

# Install packages if not already done
npm install

# Update .env file with your Razorpay keys
# Edit backend/.env:
# RAZORPAY_KEY_ID=rzp_test_xxxxx
# RAZORPAY_SECRET=rzp_test_xxxxx

# Start backend server
npm start
# Should run on http://localhost:9000
```

## Step 3: Frontend Setup

```bash
cd frontend  # or fronetnd directory

# Update .env file
# Edit frontend/.env:
# VITE_RAZORPAY_KEY=rzp_test_xxxxx
# VITE_API_BASE=http://localhost:9000/api/v1

# Install packages if not already done
npm install

# Start frontend dev server
npm run dev
# Should run on http://localhost:5173
```

## Step 4: Test the Flow

1. **Open browser:** http://localhost:5173
2. **Login/Register** if needed
3. **Add products to cart**
4. **Go to checkout**
5. **Test COD first:**
   - Fill form → Select "Cash on Delivery" → Place Order
   - Should complete immediately
6. **Test Razorpay:**
   - Fill form → Select "Razorpay" → Place Order
   - Use test card: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3 digits
   - OTP: 123456

## Troubleshooting

**Backend not starting?**
```bash
# Check if port 9000 is in use
netstat -ano | findstr :9000

# Kill process if needed and restart
npm start
```

**Frontend not connecting to backend?**
- Check browser console (F12) for errors
- Verify backend is running on port 9000
- Check VITE_API_BASE in frontend/.env

**Payment modal not opening?**
- Check browser console
- Verify VITE_RAZORPAY_KEY is set
- Check network tab for Razorpay CDN

**Signature verification failing?**
- Verify RAZORPAY_SECRET is correct
- Check backend logs for errors
- Clear browser cache and retry

## Important Notes

⚠️ **IMPORTANT:**
- Current setup uses TEST keys (won't actually charge)
- For production, switch to LIVE keys
- Never commit keys to version control
- Always verify payment signatures (done automatically)

## API Endpoints Reference

```
# Create Order
POST http://localhost:9000/api/v1/orders
Headers: { Authorization: Bearer TOKEN, Content-Type: application/json }

# Create Payment Order
POST http://localhost:9000/api/v1/payments/create-order
Headers: { Authorization: Bearer TOKEN, Content-Type: application/json }
Body: { amount: 10000, orderId: "order_id" }

# Verify Payment
POST http://localhost:9000/api/v1/payments/verify-signature
Headers: { Authorization: Bearer TOKEN, Content-Type: application/json }
Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }

# Get Order
GET http://localhost:9000/api/v1/orders/:orderId
Headers: { Authorization: Bearer TOKEN }

# Get Payment
GET http://localhost:9000/api/v1/payments/:paymentId
Headers: { Authorization: Bearer TOKEN }
```

## File Structure

```
A_Computers/
├── backend/
│   ├── Model/
│   │   ├── Payment.js (Updated)
│   │   ├── Order.js (Updated)
│   │   └── ...
│   ├── Controllers/
│   │   ├── paymentController.js (NEW)
│   │   ├── orderController.js (Updated)
│   │   └── ...
│   ├── Routes/
│   │   ├── payment.js (Updated)
│   │   └── ...
│   ├── .env (Update with Razorpay keys)
│   └── index.js
│
├── frontend (or fronetnd)/
│   ├── src/
│   │   ├── Components/
│   │   │   └── CheckoutPage.jsx (Updated)
│   │   ├── context/
│   │   │   └── OrdersContext.jsx
│   │   ├── api.js (Updated with payment endpoints)
│   │   └── ...
│   ├── .env (Update with Razorpay key)
│   └── vite.config.js
│
├── RAZORPAY_INTEGRATION.md (Complete guide)
└── SETUP_GUIDE.md (This file)
```

## Quick Commands

```bash
# Install all dependencies
cd backend && npm install
cd ../frontend && npm install

# Start both servers (in separate terminals)
# Terminal 1:
cd backend && npm start

# Terminal 2:
cd frontend && npm run dev

# Stop servers
Ctrl+C (in each terminal)
```

## Success Indicators

✅ Backend ready:
```
🚀 Backend Server is running on port 9000
Environment: development
```

✅ Frontend ready:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Payment flow working:
- Checkout page loads
- Razorpay modal opens on payment button
- Payment completes without errors
- Order shows in order history with "completed" payment status

## Next Steps

1. Review [RAZORPAY_INTEGRATION.md](./RAZORPAY_INTEGRATION.md) for complete documentation
2. Test all payment scenarios
3. Set up MongoDB connection string if using Atlas
4. Configure email notifications (optional)
5. Deploy to production with live keys

---

**Happy Coding!** 🚀
