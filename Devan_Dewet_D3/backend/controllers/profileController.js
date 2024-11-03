const { MongoClient, ObjectId } = require('mongodb');


const uri = 'mongodb+srv://devandewet:Ky!e0106@cluster0.rpub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function getUserProfile(req, res) {
    const userId = req.params.id; 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('Mixr');
        console.log('Fetching user with ID:', userId);
        console.log('Querying user with ObjectId:', new ObjectId(userId));
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        
        const user = await db.collection('profiles').findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error.message); 
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function deleteUserProfile(req, res) {
    const userId = req.params.id; 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('Mixr');

        
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        
        const result = await db.collection('profiles').deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting user profile:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function editUserProfile(req, res) {
    const userId = req.params.id; 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('Mixr');

        
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        
        const { username, email, bio, profilePicture } = req.body;

        
        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (bio) updateFields.bio = bio;
        if (profilePicture) updateFields.profilePicture = profilePicture;

        
        const result = await db.collection('profiles').updateOne(
            { _id: new ObjectId(userId) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function followUser(req, res) {
    const userId = req.params.id; 
    const { username } = req.body; 

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const userToFollow = await db.collection('profiles').findOne({ username });
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        await db.collection('profiles').updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { following: userToFollow._id } }
        );

        
        await db.collection('profiles').updateOne(
            { _id: userToFollow._id },
            { $addToSet: { followers: userId } }
        );

        res.status(200).json({ message: `Successfully followed ${username}` });
    } catch (error) {
        console.error('Error following user:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function unfollowUser(req, res) {
    const userId = req.params.id; 
    const { username } = req.body; 

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('Mixr');

        
        const userToUnfollow = await db.collection('profiles').findOne({ username });
        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        await db.collection('profiles').updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { following: userToUnfollow._id } }
        );

        
        await db.collection('profiles').updateOne(
            { _id: userToUnfollow._id },
            { $pull: { followers: userId } }
        );

        res.status(200).json({ message: `Successfully unfollowed ${username}` });
    } catch (error) {
        console.error('Error unfollowing user:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function getUserFollowers(req, res) {
    const userId = req.params.id; 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('Mixr');

        
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        
        const user = await db.collection('profiles').findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const followers = await db.collection('profiles').find({ _id: { $in: user.followers } }).toArray();

        
        const followerData = followers.map(follower => ({
            _id: follower._id,
            username: follower.username
        }));

        
        res.status(200).json(followerData);
    } catch (error) {
        console.error('Error fetching user followers:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function getUserFollowing(req, res) {
    const userId = req.params.id; 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('Mixr');

        
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        
        const user = await db.collection('profiles').findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        const following = await db.collection('profiles').find({ _id: { $in: user.following } }).toArray();

        
        const followingData = following.map(followed => ({
            _id: followed._id,
            username: followed.username
        }));

        
        res.status(200).json(followingData);
    } catch (error) {
        console.error('Error fetching user following:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}

async function getAllUserProfiles(req, res) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('Mixr');
        
        
        const profiles = await db.collection('profiles').find({}).toArray();

        if (profiles.length === 0) {
            return res.status(404).json({ message: 'No user profiles found' });
        }

        
        const userProfiles = profiles.map(profile => ({
            _id: profile._id,
            username: profile.username,
            email: profile.email,
            bio: profile.bio,
            profilePicture: profile.profilePicture,
            
        }));

        
        res.status(200).json(userProfiles);
    } catch (error) {
        console.error('Error fetching all user profiles:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
        await client.close();
    }
}
module.exports = { getUserProfile, deleteUserProfile, editUserProfile, unfollowUser, followUser ,getUserFollowing ,getUserFollowers ,getAllUserProfiles};