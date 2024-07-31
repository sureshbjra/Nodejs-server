import mongoose from 'mongoose';

const connectDB = async (connectionString) => {
    try {
        if (!connectionString) {
            console.log('MongoDB not connected');
            return false;
        }
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;
