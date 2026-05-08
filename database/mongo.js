const mongoose = require('mongoose');
const { getAllContacts } = require('../controllers/contactController');
const Contact = require('../models/contactModel');

// MONGO BECAUSE WHY NOT
async function connectMongo() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('❌ MONGO_URI missing in .env');
        return;
    }

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(' MongoDB connected');
        const collection = await mongoose.connection.db.collection('contacts').findOne();
        const contacts = await Contact.find();
        console.log(' Collections in database:', contacts);


    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
    }

    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected');
    });
}

module.exports = connectMongo;
