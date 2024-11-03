// controllers/authController.js
const express = require('express');
const { MongoClient  } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = 'S0m3Sup3rS3cur3L0ngR@ndomStr1ng!12345';


const uri = 'mongodb+srv://devandewet:Ky!e0106@cluster0.rpub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    return client;
}


function createUserData(req) {
    const { username, email, password, profilePicture, bio ,isAdmin } = req.body;
    return {
        username,
        email,
        password: password, 
        profilePicture: profilePicture || "",
        bio: bio || "",
        isAdmin: isAdmin || false 
    };
}


function generateToken(userId) {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

async function insertUser(req, res) {
    const client = await connectToDatabase();

    try {
        const db = client.db('Mixr');
        const userData = createUserData(req);

     
        const existingUser = await db.collection('profiles').findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

    
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

 
        const result = await db.collection('profiles').insertOne(userData);
        console.log('User inserted with _id:', result.insertedId);

  
        res.status(201).json({ message: 'User created successfully', user: userData });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Server error');
    } finally {
        await client.close();
    }
}

async function loginUser(req, res) {
    const client = await connectToDatabase();

    try {
        const db = client.db('Mixr');
        const { email, password } = req.body;

        console.log('Attempting to login with:', email);

 
        const user = await db.collection('profiles').findOne({ email });
        console.log('User found:', user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials 1' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials 2 ' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: `Welcome ${user.username}, you have successfully logged in!`,
            token,
            userId: user._id,
            username: user.username
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Server error');
    } finally {
        await client.close();
    }
}

let tokenBlacklist = [];

async function Logout(req, res) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    // Add the token to the blacklist
    tokenBlacklist.push(token);

    return res.status(200).json({ message: 'Successfully logged out' });
}

module.exports = { insertUser, loginUser, Logout };
