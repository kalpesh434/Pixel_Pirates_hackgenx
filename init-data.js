// Data initialization script for MongoDB
const { MongoClient } = require('mongodb');

// Connection URI and database name
const uri = 'mongodb://localhost:27017';
const dbName = 'budgetAllocationSystem';

// Sample data
const sampleUsers = [
    {
        name: 'Government Admin',
        email: 'admin@gov.in',
        mobile: '9876543210',
        password: 'admin123',
        role: 'government',
        createdAt: new Date()
    },
    {
        name: 'Public User',
        email: 'user@example.com',
        mobile: '9876543211',
        password: 'user123',
        role: 'public',
        createdAt: new Date()
    }
];

const sampleBudget = {
    totalAmount: 225000,
    fiscalYear: '2023-24',
    sectors: [
        { name: 'Healthcare', amount: 50000, percentage: 22.22 },
        { name: 'Infrastructure', amount: 45000, percentage: 20 },
        { name: 'Education', amount: 40000, percentage: 17.78 },
        { name: 'Defense', amount: 35000, percentage: 15.56 },
        { name: 'Agriculture', amount: 30000, percentage: 13.33 },
        { name: 'Social Welfare', amount: 25000, percentage: 11.11 }
    ],
    createdAt: new Date()
};

const sampleProjects = [
    {
        name: 'National Highway Development',
        budget: 12000,
        status: 'in-progress',
        completion: 65,
        category: 'mega',
        region: 'north',
        description: 'Major highway development project connecting northern states.',
        startDate: new Date('2022-04-15'),
        endDate: new Date('2025-03-31')
    },
    {
        name: 'Rural Healthcare Initiative',
        budget: 8000,
        status: 'planning',
        completion: 20,
        category: 'mega',
        region: 'south',
        description: 'Establishing healthcare centers in rural areas of southern states.',
        startDate: new Date('2023-01-10'),
        endDate: new Date('2025-12-31')
    },
    {
        name: 'Digital Education Program',
        budget: 6000,
        status: 'in-progress',
        completion: 40,
        category: 'minor',
        region: 'central',
        description: 'Providing digital education resources to schools in central India.',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2024-06-30')
    }
];

const sampleFeedback = [
    {
        topic: 'healthcare',
        text: 'Need more budget allocation for rural healthcare facilities.',
        satisfaction: 4,
        createdAt: new Date()
    },
    {
        topic: 'education',
        text: 'Digital education initiatives should be expanded nationwide.',
        satisfaction: 7,
        createdAt: new Date()
    },
    {
        topic: 'infrastructure',
        text: 'Road quality in rural areas needs improvement.',
        satisfaction: 3,
        createdAt: new Date()
    }
];

// Connect to MongoDB and insert sample data
async function initializeData() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        console.log('Connected to MongoDB server for data initialization');
        
        const db = client.db(dbName);
        
        // Check if data already exists
        const usersCount = await db.collection('users').countDocuments();
        const budgetsCount = await db.collection('budgets').countDocuments();
        const projectsCount = await db.collection('projects').countDocuments();
        const feedbackCount = await db.collection('feedback').countDocuments();
        
        // Insert users if collection is empty
        if (usersCount === 0) {
            await db.collection('users').insertMany(sampleUsers);
            console.log('Sample users inserted');
        } else {
            console.log('Users collection already has data, skipping insertion');
        }
        
        // Insert budget if collection is empty
        if (budgetsCount === 0) {
            await db.collection('budgets').insertOne(sampleBudget);
            console.log('Sample budget inserted');
        } else {
            console.log('Budgets collection already has data, skipping insertion');
        }
        
        // Insert projects if collection is empty
        if (projectsCount === 0) {
            await db.collection('projects').insertMany(sampleProjects);
            console.log('Sample projects inserted');
        } else {
            console.log('Projects collection already has data, skipping insertion');
        }
        
        // Insert feedback if collection is empty
        if (feedbackCount === 0) {
            await db.collection('feedback').insertMany(sampleFeedback);
            console.log('Sample feedback inserted');
        } else {
            console.log('Feedback collection already has data, skipping insertion');
        }
        
        console.log('Data initialization complete');
        
    } catch (err) {
        console.error('Error initializing data:', err);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

// Run the initialization function
initializeData().catch(console.error); 