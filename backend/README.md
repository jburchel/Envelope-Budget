# Envelope Budgeting App - Backend

The backend API for the Envelope Budgeting App, built with Express, TypeScript, and Node.js.

## Directory Structure

```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middlewares/  # Express middlewares
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── server.ts     # Main server file
├── dist/             # Compiled TypeScript
├── node_modules/     # Dependencies
├── .env              # Environment variables (not in repo)
├── .env.example      # Example environment variables
├── package.json      # Project metadata and scripts
└── tsconfig.json     # TypeScript configuration
```

## Getting Started

1. Copy the environment variables example file:
   ```
   cp .env.example .env
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. For production build:
   ```
   npm run build
   npm start
   ```

## Available Scripts

- `npm run build` - Compiles TypeScript to JavaScript
- `npm start` - Runs the compiled JavaScript
- `npm run dev` - Runs the server in development mode using ts-node
- `npm run watch` - Runs the server with auto-restart on file changes 