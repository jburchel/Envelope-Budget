# Envelope Budgeting App - Backend API

This is the backend API for the Envelope Budgeting App. It provides endpoints for user authentication, budget management, and transaction processing.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v13+)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd envelope-budgeting-app/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up the environment variables:
   ```
   cp .env.example .env
   ```
   Then edit `.env` with your PostgreSQL credentials.

5. Generate Prisma client:
   ```
   npm run prisma:generate
   ```
6. Run database migrations:
   ```
   npm run prisma:migrate
   ```

### Running the Server

For development:
```
npm run dev
```

For production:
```
npm run build
npm start
```

### Testing

Run the test suite:
```
npm test
```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password123", "firstName": "John", "lastName": "Doe" }`
  - Response: `{ "success": true, "token": "jwt_token", "user": { ... } }`

- **POST /api/auth/login** - Log in an existing user
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "success": true, "token": "jwt_token", "user": { ... } }`

- **POST /api/auth/forgot-password** - Request password reset
  - Body: `{ "email": "user@example.com" }`
  - Response: `{ "success": true, "message": "Password reset email sent" }`

- **POST /api/auth/reset-password** - Reset password with token
  - Body: `{ "token": "reset_token", "password": "new_password" }`
  - Response: `{ "success": true, "message": "Password reset successful" }`

### Budget Management

- **GET /api/budgets** - Get all budgets for the authenticated user
  - Auth: Bearer token
  - Response: `{ "success": true, "data": [ ... ] }`

- **GET /api/budgets/default** - Get the default budget for the user
  - Auth: Bearer token
  - Response: `{ "success": true, "data": { ... } }`

- **GET /api/budgets/:id** - Get a specific budget by ID
  - Auth: Bearer token
  - Response: `{ "success": true, "data": { ... } }`

- **POST /api/budgets** - Create a new budget
  - Auth: Bearer token
  - Body: `{ "name": "My Budget", "currency": "USD", "isDefault": false }`
  - Response: `{ "success": true, "data": { ... } }`

- **PUT /api/budgets/:id** - Update a budget
  - Auth: Bearer token
  - Body: `{ "name": "Updated Budget", "currency": "EUR", "isDefault": true }`
  - Response: `{ "success": true, "data": { ... } }`

- **DELETE /api/budgets/:id** - Delete a budget
  - Auth: Bearer token
  - Response: `{ "success": true, "message": "Budget deleted successfully" }`

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200/201` - Success
- `400` - Bad request (invalid input)
- `401` - Unauthorized (invalid or expired token)
- `404` - Not found
- `500` - Server error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Database Schema

The database schema is defined in `prisma/schema.prisma` and includes the following models:
- `User` - User accounts
- `Budget` - Budget containers
- `CategoryGroup` (coming soon) - Grouping for categories
- `Category` (coming soon) - Budget categories
- `Account` (coming soon) - Financial accounts
- `Transaction` (coming soon) - Financial transactions

## License

This project is licensed under the MIT License - see the LICENSE file for details. 