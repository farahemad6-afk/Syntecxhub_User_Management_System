# Syntecxhub_User_Management_System

RESTful API for user management built with **Node.js, Express, MongoDB, Mongoose** and secured with **HTTP Basic Authentication**.

## Features
- Full CRUD for users
- Mongoose schema with validation, unique email, timestamps
- Passwords hashed with bcrypt (never returned in responses)
- Basic Auth (`Authorization: Basic base64(email:password)`)
- Role-based access: `user` and `admin`
- Input validation (express-validator), Helmet, rate limiting, centralized error handling
- Pagination on the list endpoint
- Postman collection included

## Setup
```bash
npm install
cp .env.example .env      # edit MONGO_URI if needed
npm run seed:admin        # creates the first admin
npm run dev               # or: npm start
```
Requires Node 18+ and a running MongoDB (local or Atlas).

## Endpoints
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/users` | Public | Register (role = user) |
| GET | `/api/users/me` | Authenticated | Current user |
| GET | `/api/users?page=1&limit=10` | Admin | List users (paginated) |
| GET | `/api/users/:id` | Self or Admin | Get one user |
| PUT | `/api/users/:id` | Self or Admin | Update (only admin can change `role`) |
| DELETE | `/api/users/:id` | Admin | Delete user |

### Example
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Pass1234"}'

curl -u john@example.com:Pass1234 http://localhost:5000/api/users/me
```

## Testing with Postman
Import `postman/Syntecxhub_User_Management.postman_collection.json`, then set the `userId` collection variable after creating a user.

## Status codes
`200/201` success · `400` validation · `401` bad/missing credentials · `403` forbidden · `404` not found · `409` duplicate email · `500` server error

## Structure
```
src/ config/ models/ middleware/ controllers/ routes/ app.js server.js
scripts/seedAdmin.js
postman/
```
