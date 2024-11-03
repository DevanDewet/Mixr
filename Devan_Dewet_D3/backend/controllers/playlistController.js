const { MongoClient, ObjectId } = require('mongodb');


const uri = 'mongodb+srv://devandewet:Ky!e0106@cluster0.rpub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function createPlaylist(req, res) {
    const { coverImage, name, genre, shortDescription, hashtags, createdBy } = req.body;

    
    if (!genre || !shortDescription || !createdBy) {
        return res.status(400).json({ message: 'Missing required fields: genre, shortDescription, or createdBy' });
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const validHashtags = Array.isArray(hashtags) ? hashtags : [];

        
        const playlistCoverImage = coverImage || 'https://images.app.goo.gl/Z4TQKCPQXje53aYq7';

        
        const playlistName = name && name.trim() ? name : 'Untitled Playlist';

        const newPlaylist = {
            coverImage: playlistCoverImage,
            name: playlistName,
            genre,
            shortDescription,
            hashtags: validHashtags,
            songs: [],  
            comments: [],  
            createdBy: new ObjectId(createdBy),
            createdAt: new Date(),
        };

        const result = await db.collection('playlists').insertOne(newPlaylist);

        res.status(201).json({ 
            message: 'Playlist created successfully', 
            playlistId: result.insertedId 
        });
    } catch (error) {
        console.error('Error creating playlist:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}
async function deletePlaylist(req, res) {
    const playlistId = req.params.id;

    
    if (!ObjectId.isValid(playlistId)) {
        return res.status(400).json({ message: 'Invalid playlist ID format' });
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const result = await db.collection('playlists').deleteOne({ _id: new ObjectId(playlistId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        console.error('Error deleting playlist:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function getUserPlaylists(req, res) {
    const userId = req.params.userId; 

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const playlists = await db.collection('playlists').find({ createdBy: new ObjectId(userId) }).toArray();

        if (!playlists.length) {
            return res.status(404).json({ message: 'No playlists found for this user' });
        }

        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function getPlaylistById(req, res) {
    const playlistId = req.params.id; 

    
    if (!ObjectId.isValid(playlistId)) {
        return res.status(400).json({ message: 'Invalid playlist ID format' });
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const playlist = await db.collection('playlists').findOne({ _id: new ObjectId(playlistId) });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json(playlist); 
    } catch (error) {
        console.error('Error fetching playlist:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function getGenres(req, res) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const genres = await db.collection('genres').find({}, { projection: { name: 1 } }).toArray();

        
        const genreNames = genres.map(genre => genre.name);

        res.status(200).json(genreNames);
    } catch (error) {
        console.error('Error fetching genres:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}


async function editPlaylist(req, res) {
    const playlistId = req.params.id; 
    const { coverImage, name, genre, shortDescription, hashtags } = req.body;

   
    if (!ObjectId.isValid(playlistId)) {
        return res.status(400).json({ message: 'Invalid playlist ID format' });
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const updateFields = {};
        if (coverImage) updateFields.coverImage = coverImage;
        if (name) updateFields.name = name;
        if (genre) updateFields.genre = genre;
        if (shortDescription) updateFields.shortDescription = shortDescription;
        if (Array.isArray(hashtags)) updateFields.hashtags = hashtags;

        
        const result = await db.collection('playlists').updateOne(
            { _id: new ObjectId(playlistId) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist updated successfully' });
    } catch (error) {
        console.error('Error updating playlist:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}



async function addSongToPlaylist(req, res) {
    const playlistId = req.params.id; 

    // Extract song details from request body
    const { title, artist, album, duration, link } = req.body; 

    // Check if required song details are provided
    if (!title || !artist || !link) {
        return res.status(400).json({ message: 'Missing required fields: title, artist, or link' });
    }

    // Validate playlist ID format
    if (!ObjectId.isValid(playlistId)) {
        return res.status(400).json({ message: 'Invalid playlist ID format' });
    }

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        // Create a new song object
        const newSong = {
            title,
            artist,
            album,
            duration,
            link,
            createdAt: new Date()  // Automatically set createdAt to the current date
        };

        // Insert the new song into the songs collection
        const result = await db.collection('songs').insertOne(newSong);
        
        // Check if the song was created successfully
        if (result.insertedId) {
            // Now add the new song to the playlist
            const songToAdd = { _id: result.insertedId }; // Prepare song object to add to playlist

            const updateResult = await db.collection('playlists').updateOne(
                { _id: new ObjectId(playlistId) },
                { $addToSet: { songs: songToAdd } } // Use $addToSet to avoid duplicates
            );

            if (updateResult.matchedCount === 0) {
                return res.status(404).json({ message: 'Playlist not found' });
            }

            res.status(200).json({ message: 'Song created and added to playlist successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create the song' });
        }
    } catch (error) {
        console.error('Error adding song to playlist:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}



module.exports = { createPlaylist, deletePlaylist, getUserPlaylists, getPlaylistById, editPlaylist, addSongToPlaylist, getGenres };


