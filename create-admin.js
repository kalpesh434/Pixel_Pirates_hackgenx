// Script to create a government admin user
const { connectToMongo, getDb, closeConnection } = require('./db');

async function createAdminUser() {
    try {
        console.log('Connecting to MongoDB...');
        await connectToMongo();
        console.log('Connected to MongoDB successfully!');
        
        const db = getDb();
        const users = db.collection('users');
        
        // Check if admin already exists
        const adminUser = await users.findOne({ 
            $or: [
                { email: 'admin@gov.in' },
                { mobile: '9876543210' },
                { role: 'government' }
            ] 
        });
        
        if (adminUser) {
            console.log('Admin user already exists:');
            console.log(`- Name: ${adminUser.name}`);
            console.log(`- Email: ${adminUser.email}`);
            console.log(`- Mobile: ${adminUser.mobile}`);
            console.log(`- Role: ${adminUser.role}`);
            
            // Ensure the role is set to government
            if (adminUser.role !== 'government') {
                console.log('Updating user role to government...');
                await users.updateOne(
                    { _id: adminUser._id },
                    { $set: { role: 'government' } }
                );
                console.log('User role updated to government');
            }
        } else {
            // Create new admin user
            const newAdmin = {
                name: 'Government Admin',
                email: 'admin@gov.in',
                mobile: '9876543210',
                password: 'admin123',
                role: 'government',
                createdAt: new Date()
            };
            
            await users.insertOne(newAdmin);
            console.log('Created new government admin user:');
            console.log('- Email: admin@gov.in');
            console.log('- Mobile: 9876543210');
            console.log('- Password: admin123');
        }
        
        // Verify government users
        const govUsers = await users.find({ role: 'government' }).toArray();
        console.log(`Total government users in database: ${govUsers.length}`);
        
        await closeConnection();
        console.log('Connection closed');
        
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

createAdminUser(); 