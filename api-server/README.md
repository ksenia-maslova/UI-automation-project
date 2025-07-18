# API Server Documentation

## Overview
This is a simple concert ticketing API with user authentication, roles, and CRUD operations for concerts. Users can register, log in, view concerts, purchase tickets, and see their purchased concerts. Admins can manage concerts.

---

## Setup
1. Install dependencies:
   ```sh
   npm install --prefix api-server
   ```
2. Start the API server:
   ```sh
   npm run api-server
   ```
   The server runs on `http://localhost:3001` by default.

---

## User Roles
- **public**: Not authenticated. Can view concerts and register.
- **user**: Authenticated user. Can purchase tickets and view their concerts.
- **admin**: Can add, update, and delete concerts.

---

## Authentication
- Register and log in to receive a JWT token.
- Pass the token in the `Authorization` header as `Bearer <token>` for protected endpoints.

---

## Endpoints

### Auth & User
#### Register
- `POST /register`
- Body: `{ "username": "string", "password": "string" }`
- Password must be at least 4 characters. Username cannot be empty.
- Response: `{ "success": true }` or error

#### Login
- `POST /login`
- Body: `{ "username": "string", "password": "string" }`
- Response: `{ "token": "<jwt>" }` or error

---

### Concerts
#### List All Concerts (Public)
- `GET /concerts`
- Response: Array of concerts
  ```json
  [
    {
      "id": 1,
      "name": "Concert Name",
      "location": "Venue",
      "ticket_price": 50.0,
      "date": "2024-07-01"
    }
  ]
  ```

#### Add Concert (Admin)
- `POST /concerts`
- Headers: `Authorization: Bearer <token>` (admin only)
- Body: `{ "name": "string", "location": "string", "ticket_price": number, "date": "YYYY-MM-DD" }`
- Response: `{ "success": true }` or error

#### Update Concert (Admin)
- `PUT /concerts/:id`
- Headers: `Authorization: Bearer <token>` (admin only)
- Body: `{ "name": "string", "location": "string", "ticket_price": number, "date": "YYYY-MM-DD" }`
- Response: `{ "success": true }` or error

#### Delete Concert (Admin)
- `DELETE /concerts/:id`
- Headers: `Authorization: Bearer <token>` (admin only)
- Response: `{ "success": true }` or error

#### Get Concert by ID (Public)
- `GET /concerts/:id`
- Response: Concert object (or empty array if not found)
  ```json
  [
    {
      "id": 1,
      "name": "Concert Name",
      "location": "Venue",
      "ticket_price": 50.0,
      "date": "2024-07-01"
    }
  ]
  ```

---

### Ticket Purchase (User)
#### Purchase Ticket
- `POST /purchase`
- Headers: `Authorization: Bearer <token>` (user or admin)
- Body: `{ "concert_id": number }`
- Response: `{ "success": true }` or error

#### My Concerts
- `GET /my-concerts`
- Headers: `Authorization: Bearer <token>` (user or admin)
- Response:
  ```json
  {
    "upcoming": [ ... ],
    "today": [ ... ],
    "past": [ ... ]
  }
  ```
  Each array contains concert objects as above.

---

### Miscellaneous
#### Protected Test Endpoint
- `GET /protected`
- Headers: `Authorization: Bearer <token>`
- Response: `{ "message": "Hello, <username>! This is protected data." }`

---

## Error Handling
- All errors return JSON with an `error` field and appropriate HTTP status code.
- Example:
  ```json
  { "error": "Invalid credentials" }
  ```

---

## Example Usage (curl)

### Register
```sh
curl -X POST http://localhost:3001/register -H "Content-Type: application/json" -d '{"username":"user1","password":"pass1234"}'
```

### Login
```sh
curl -X POST http://localhost:3001/login -H "Content-Type: application/json" -d '{"username":"user1","password":"pass1234"}'
```

### List Concerts
```sh
curl http://localhost:3001/concerts
```

### Add Concert (Admin)
```sh
curl -X POST http://localhost:3001/concerts -H "Authorization: Bearer <admin_token>" -H "Content-Type: application/json" -d '{"name":"Rock Night","location":"Stadium","ticket_price":100,"date":"2024-07-01"}'
```

### Purchase Ticket (User)
```sh
curl -X POST http://localhost:3001/purchase -H "Authorization: Bearer <user_token>" -H "Content-Type: application/json" -d '{"concert_id":1}'
```

### My Concerts (User)
```sh
curl http://localhost:3001/my-concerts -H "Authorization: Bearer <user_token>"
```

---

## Notes
- To create an admin, manually update the user's role in the database (e.g., via SQLite CLI):
  ```sql
  UPDATE users SET role = 'admin' WHERE username = 'your_admin_username';
  ```
- Dates must be in `YYYY-MM-DD` format for correct categorization. 

### Users (Admin)
#### Delete User by ID
- `DELETE /users/:id`
- Headers: `Authorization: Bearer <admin_token>`
- Only admin can call this endpoint. Admin cannot delete themselves.
- Response: `{ "success": true }` or error
- Error cases:
  - 400: Admin cannot delete themselves
  - 404: User not found 