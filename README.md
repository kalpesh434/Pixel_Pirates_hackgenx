# Budget Allocation System with MongoDB Integration

This application is a Budget Allocation System that helps governments and citizens visualize, analyze, and optimize budget allocations across various sectors.

## Features

- Interactive dashboards for both government officials and public users
- Budget visualization and analysis tools
- Disaster fund prediction
- Tax optimization recommendations
- Public feedback collection and analysis
- Project tracking and filtering

## MongoDB Integration

This application now supports MongoDB for data persistence. All data including users, budgets, feedback, and projects are stored in MongoDB.

### Setup Instructions

1. Make sure MongoDB is installed and running on your system
   - MongoDB should be running at `mongodb://localhost:27017`

2. Install required dependencies:
   ```
   npm install
   ```

3. Initialize sample data (optional):
   ```
   node init-data.js
   ```

4. Start the server:
   ```
   npm start
   ```

5. Access the application:
   ```
   http://localhost:3000
   ```

### Login Credentials

After initializing sample data, you can use these credentials:

**Government User:**
- Email: admin@gov.in
- Mobile: 9876543210
- Password: admin123

**Public User:**
- Email: user@example.com
- Mobile: 9876543211
- Password: user123

## MongoDB Database Structure

- **Database Name:** budgetAllocationSystem
- **Collections:**
  - users - User accounts for both government and public users
  - budgets - Budget allocation data for different fiscal years
  - sectors - Details about different sectors receiving budget allocations
  - feedback - Public feedback on budget allocations
  - projects - Ongoing government projects across different sectors
  - taxRecommendations - Tax optimization recommendations

## Technical Details

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Charts: Chart.js

## Development

- To modify MongoDB connection settings, edit `db.js`
- API endpoints are defined in `server.js`
- Sample data for initialization is in `init-data.js` 