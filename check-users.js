// Script to check users in MongoDB
const { connectToMongo, getDb, closeConnection } = require('./db');

async function checkUsers() {
    try {
        console.log('Connecting to MongoDB...');
        await connectToMongo();
        console.log('Connected successfully!');
        
        const db = getDb();
        const users = db.collection('users');
        
        // Find all users
        const allUsers = await users.find({}).toArray();
        
        console.log(`Found ${allUsers.length} users in database:`);
        allUsers.forEach(user => {
            // Print user details but mask password
            const maskedPassword = user.password ? '********' : 'no password';
            console.log(`- User: ${user.name || 'N/A'}`);
            console.log(`  Email: ${user.email || 'N/A'}`);
            console.log(`  Mobile: ${user.mobile || 'N/A'}`);
            console.log(`  Role: ${user.role || 'N/A'}`);
            console.log(`  Password: ${maskedPassword}`);
            console.log('---');
        });
        
        // Check for government role users
        const governmentUsers = await users.find({ role: 'government' }).toArray();
        console.log(`Found ${governmentUsers.length} users with government role`);
        
        // If no government users, create one
        if (governmentUsers.length === 0) {
            console.log('No government users found. Creating a default government admin user...');
            
            const newAdmin = {
                name: 'Government Admin',
                email: 'admin@gov.in',
                mobile: '9876543210',
                password: 'admin123',
                role: 'government',
                createdAt: new Date()
            };
            
            await users.insertOne(newAdmin);
            console.log('Created government admin user:');
            console.log('- Email: admin@gov.in');
            console.log('- Mobile: 9876543210');
            console.log('- Password: admin123');
        }
        
        await closeConnection();
        console.log('Connection closed');
        
    } catch (error) {
        console.error('Error checking users:', error);
    }
}

// Run the function
checkUsers(); 