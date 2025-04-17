# MongoDB Integration for Budget Allocation System

This document explains how to set up the MongoDB integration for the Budget Allocation System.

## Prerequisites

- Node.js and npm installed
- MongoDB server running at `mongodb://localhost:27017`

## Files Added

1. `db.js` - MongoDB connection module
2. `server.js` - Express server with API endpoints
3. `package.json` - Updated with MongoDB dependencies

## Setup Instructions

1. Install the required dependencies:
   ```
   npm install
   ```

2. Start the MongoDB server (if not already running):
   ```
   # On Windows
   "C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
   
   # On macOS/Linux
   mongod
   ```

3. Start the Express server:
   ```
   npm start
   ```

   The server will run on port 3000 by default.

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## API Endpoints

The following API endpoints are available:

- `GET /api/health` - Check server health
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `GET /api/budget/current` - Get current budget data
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/analysis` - Get feedback analysis
- `GET /api/projects` - Get projects (with optional filters)

## Testing the MongoDB Connection

1. Make sure MongoDB is running at `mongodb://localhost:27017`
2. Start the Express server
3. Open the browser console to see if the MongoDB connection is successful
4. You should see messages confirming the connection

## Troubleshooting

- If you see connection errors, make sure your MongoDB server is running
- Check if the MongoDB connection string is correct (`mongodb://localhost:27017`)
- Verify that the required npm packages are installed 