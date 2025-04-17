// Simple MongoDB connection test
const { connectToMongo, getDb, closeConnection } = require('./db');

async function testMongoConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        
        // Connect to MongoDB
        const db = await connectToMongo();
        console.log('Connected to MongoDB successfully!');
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('Available collections:');
        collections.forEach(collection => {
            console.log(`- ${collection.name}`);
        });
        
        // Display count of items in each collection
        for (const collection of collections) {
            const count = await db.collection(collection.name).countDocuments();
            console.log(`Collection '${collection.name}' has ${count} documents`);
        }
        
        // Close the connection
        await closeConnection();
        console.log('Connection closed successfully');
        
    } catch (error) {
        console.error('Error testing MongoDB connection:', error);
    }
}

// Run the test
testMongoConnection(); 