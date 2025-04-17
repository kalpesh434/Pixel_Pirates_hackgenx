// Simple script to run server.js by loading it as a module
console.log('Current directory:', __dirname);
console.log('Attempting to load server.js...');

try {
    // This will load server.js but won't call the main function
    require('./server');
    console.log('Server loaded successfully!');
    
    // Now run it explicitly
    console.log('Starting server...');
    // The server will start automatically when loaded
} catch (error) {
    console.error('Failed to load server:', error);
} 