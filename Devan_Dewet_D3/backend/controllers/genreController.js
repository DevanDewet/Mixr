    const { MongoClient, ObjectId } = require('mongodb');

    
    const uri = 'mongodb+srv://devandewet:Ky!e0106@cluster0.rpub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



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

    async function addGenre(req, res) {
        const { name } = req.body; 
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const db = client.db('Mixr');
    
            
            await db.collection('genres').insertOne({ name });
            res.status(201).json({ message: 'Genre added successfully' });
        } catch (error) {
            console.error('Error adding genre:', error.message);
            res.status(500).json({ message: 'Server error', error: error.message });
        } finally {
            await client.close();
        }
    }
    
    async function removeGenre(req, res) {
        const { name } = req.params; 
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const db = client.db('Mixr');
    
            
            const result = await db.collection('genres').deleteOne({ name });
            
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Genre not found' });
            }
    
            res.status(200).json({ message: 'Genre removed successfully' });
        } catch (error) {
            console.error('Error removing genre:', error.message);
            res.status(500).json({ message: 'Server error', error: error.message });
        } finally {
            await client.close();
        }
    }


    module.exports = { getGenres ,removeGenre ,addGenre};


