
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://devandewet:Ky!e0106@cluster0.rpub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);
let db;


async function connectToDatabase() {
    if (!db) {
        try {
            await client.connect();
            db = client.db('Mixr');
            console.log('Connected to the database');
        } catch (error) {
            console.error('Database connection error:', error.message);
            throw new Error('Database connection failed');
        }
    }
}

async function searchUsers(req, res) {
    const { query } = req.params;

    try {
        await connectToDatabase();

        const users = await db.collection('profiles').find({ username: { $regex: query, $options: 'i' } }).toArray();

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching users:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function searchPlaylists(req, res) {
    const { query } = req.params;

    try {
        await connectToDatabase();

        const playlists = await db.collection('playlists').find({ name: { $regex: query, $options: 'i' } }).toArray();

        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error searching playlists:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function searchSongs(req, res) {
    const { query } = req.params;

    try {
        await connectToDatabase();

        const songs = await db.collection('songs').find({ title: { $regex: query, $options: 'i' } }).toArray();

        res.status(200).json(songs);
    } catch (error) {
        console.error('Error searching songs:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function searchAll(req, res) {
    const { query } = req.params;

    try {
        await connectToDatabase();

        
        const users = await db.collection('profiles').find({ username: { $regex: query, $options: 'i' } }).toArray();
        
        
        const playlists = await db.collection('playlists').find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } },
                { hashtags: { $regex: query, $options: 'i' } }
            ]
        }).toArray();

        
        const songs = await db.collection('songs').find({ title: { $regex: query, $options: 'i' } }).toArray();

        
        res.status(200).json({
            users,
            playlists,
            songs
        });
    } catch (error) {
        console.error('Error searching all:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


async function closeDatabaseConnection() {
    await client.close();
}

process.on('SIGINT', closeDatabaseConnection);
process.on('SIGTERM', closeDatabaseConnection);

module.exports = { searchUsers, searchPlaylists, searchSongs, searchAll, };
