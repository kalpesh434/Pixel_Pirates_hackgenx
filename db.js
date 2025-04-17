// MongoDB connection module
const MongoClient = require('mongodb').MongoClient;

// Connection URI - using the exact connection string provided by the user
const uri = 'mongodb://localhost:27017/';
// Database Name
const dbName = 'budgetAllocationSystem';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Database connection instance
let db = null;

// Connect to the MongoDB server
async function connectToMongo() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected successfully to MongoDB server at: ' + uri);
        
        // Get the database
        db = client.db(dbName);
        
        // Initialize collections if needed
        await initializeCollections();
        
        return db;
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

// Initialize collections
async function initializeCollections() {
    try {
        // Check if collections exist, if not create them
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        
        // Define collections if they don't exist
        const requiredCollections = [
            'users',
            'budgets',
            'sectors',
            'feedback',
            'projects',
            'taxRecommendations'
        ];
        
        for (const collection of requiredCollections) {
            if (!collectionNames.includes(collection)) {
                await db.createCollection(collection);
                console.log(`Created collection: ${collection}`);
            }
        }
    } catch (err) {
        console.error('Error initializing collections:', err);
    }
}

// Get database instance
function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToMongo first.');
    }
    return db;
}

// Close connection
async function closeConnection() {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = {
    connectToMongo,
    getDb,
    closeConnection
}; 