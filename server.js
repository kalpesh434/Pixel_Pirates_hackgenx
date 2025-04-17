const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectToMongo, getDb, closeConnection } = require('./db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB before starting server
connectToMongo()
  .then(() => {
    console.log('Database connection established');
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Access the application at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// API Routes
// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Budget Allocation API is running' });
});

// Users
app.post('/api/users/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, mobile, password } = req.body;
    const db = getDb();
    const users = db.collection('users');
    
    let user;
    if (email) {
      user = await users.findOne({ email });
      console.log(`Login attempt with email: ${email}`);
    } else if (mobile) {
      user = await users.findOne({ mobile });
      console.log(`Login attempt with mobile: ${mobile}`);
    }
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    
    console.log('User found:', { name: user.name, email: user.email, role: user.role });
    
    // In real app, implement proper password checking with bcrypt
    if (user.password !== password) {
      console.log('Invalid password');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Create a clean user object to return
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role || 'public' // Ensure role is included, default to 'public'
    };
    
    console.log('Login successful, returning user:', userResponse);
    
    res.json({ success: true, user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const db = getDb();
    const users = db.collection('users');
    
    // Check if user already exists
    const existingUser = await users.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    // In real app, implement password hashing with bcrypt
    const newUser = {
      name,
      email,
      mobile,
      password,
      role: 'public', // Default role
      createdAt: new Date()
    };
    
    const result = await users.insertOne(newUser);
    
    // Don't send password back to client
    delete newUser.password;
    
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Budget routes
app.get('/api/budget/current', async (req, res) => {
  try {
    const db = getDb();
    const budgets = db.collection('budgets');
    
    // Get the most recent budget
    const budget = await budgets.findOne({}, { sort: { fiscalYear: -1 } });
    
    if (!budget) {
      // Return default budget if none exists in database
      return res.json({
        totalAmount: 225000,
        fiscalYear: '2023-24',
        sectors: [
          { name: 'Healthcare', amount: 50000, percentage: 22.22 },
          { name: 'Infrastructure', amount: 45000, percentage: 20 },
          { name: 'Education', amount: 40000, percentage: 17.78 },
          { name: 'Defense', amount: 35000, percentage: 15.56 },
          { name: 'Agriculture', amount: 30000, percentage: 13.33 },
          { name: 'Social Welfare', amount: 25000, percentage: 11.11 }
        ]
      });
    }
    
    res.json(budget);
  } catch (error) {
    console.error('Error getting budget:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Feedback routes
app.post('/api/feedback', async (req, res) => {
  try {
    const { topic, text, satisfaction } = req.body;
    const db = getDb();
    const feedback = db.collection('feedback');
    
    const newFeedback = {
      topic,
      text,
      satisfaction,
      createdAt: new Date()
    };
    
    const result = await feedback.insertOne(newFeedback);
    
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/feedback/analysis', async (req, res) => {
  try {
    const db = getDb();
    const feedback = db.collection('feedback');
    
    // Get all feedback
    const allFeedback = await feedback.find({}).toArray();
    
    // Calculate satisfaction
    const totalFeedback = allFeedback.length;
    let totalSatisfaction = 0;
    
    if (totalFeedback > 0) {
      totalSatisfaction = allFeedback.reduce((acc, item) => acc + (item.satisfaction || 0), 0);
    }
    
    const averageSatisfaction = totalFeedback > 0 ? Math.round((totalSatisfaction / totalFeedback) * 10) : 0;
    
    // Count topics for top concern
    const topicCounts = {};
    allFeedback.forEach(item => {
      if (item.topic) {
        topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
      }
    });
    
    let topConcern = 'None';
    let maxCount = 0;
    
    for (const [topic, count] of Object.entries(topicCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topConcern = topic;
      }
    }
    
    // Simulate analysis that would be done by AI
    const analysisResults = {
      totalFeedback,
      overallSatisfaction: `${averageSatisfaction}%`,
      topConcern,
      feedbackThemes: []
    };
    
    res.json(analysisResults);
  } catch (error) {
    console.error('Error getting feedback analysis:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Projects routes
app.get('/api/projects', async (req, res) => {
  try {
    const db = getDb();
    const projects = db.collection('projects');
    
    const { category, status, region } = req.query;
    
    // Build query based on filters
    const query = {};
    if (category && category !== 'all') query.category = category;
    if (status && status !== 'all') query.status = status;
    if (region && region !== 'all') query.region = region;
    
    const allProjects = await projects.find(query).toArray();
    
    res.json(allProjects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Gracefully shutdown connections when server is interrupted
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeConnection();
  process.exit(0);
}); 