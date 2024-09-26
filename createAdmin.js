const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User'); // Adjust path as necessary

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Check if admin user already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create new admin user
        const hashedPassword = await bcrypt.hash('nishant123', 10); // Change this password as needed
        const adminUser = new User({
            username: 'nishant',
            password: hashedPassword,
        });

        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Execute the function
createAdminUser();
