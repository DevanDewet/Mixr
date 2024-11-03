
const { MongoClient, ObjectId } = require('mongodb');



const uri = 'mongodb+srv://devandewet:Ky!e0106@cluster0.rpub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    return client;
}


function createSongObject(req) {
    const { coverImage, title, artist, album, duration, link } = req.body;
    return {
        coverImage,
        title,
        artist,
        album,
        duration,
        link,
        createdAt: new Date(),
    };
}

async function updateSong(req, res) {
    const songId = req.params.id;

    
    if (!ObjectId.isValid(songId)) {
        return res.status(400).json({ message: 'Invalid song ID format' });
    }

    const client = await connectToDatabase();
    try {
        const db = client.db('Mixr');
        const { coverImage, title, artist, album, duration, link } = req.body;

        
        if (!title || !artist || !album || !duration || !link) {
            return res.status(400).json({ message: 'Missing required fields: title, artist, album, duration, or link' });
        }

        const updatedSong = {
            coverImage,
            title,
            artist,
            album,
            duration,
            link,
            updatedAt: new Date(),
        };

        const result = await db.collection('songs').updateOne(
            { _id: new ObjectId(songId) },
            { $set: updatedSong }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({ message: 'Song updated successfully' });
    } catch (error) {
        console.error('Error updating song:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function createSong(req, res) {
    const { title, artist, album, duration, link } = req.body;

    
    if (!title || !artist || !album || !duration || !link) {
        return res.status(400).json({ message: 'Missing required fields: title, artist, album, duration, or link' });
    }

    const client = await connectToDatabase();
    try {
        const db = client.db('Mixr');
        const newSong = createSongObject(req);

        const result = await db.collection('songs').insertOne(newSong);
        res.status(201).json({
            message: 'Song created successfully',
            songId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating song:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function deleteSong(req, res) {
    const songId = req.params.id;

    
    if (!ObjectId.isValid(songId)) {
        return res.status(400).json({ message: 'Invalid song ID format' });
    }

    const client = await connectToDatabase();
    try {
        const db = client.db('Mixr');

        
        const result = await db.collection('songs').deleteOne({ _id: new ObjectId(songId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.error('Error deleting song:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function getAllSongs(req, res) {
    const client = await connectToDatabase();
    try {
        const db = client.db('Mixr');

        
        const songs = await db.collection('songs').find().toArray();

        if (songs.length === 0) {
            return res.status(404).json({ message: 'No songs found' });
        }

        res.status(200).json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}



module.exports = { createSong, deleteSong, getAllSongs ,updateSong };
