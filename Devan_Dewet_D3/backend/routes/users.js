    const express = require('express');
    const { insertUser, loginUser , Logout} = require('../controllers/userController');
    const { getUserProfile, deleteUserProfile, editUserProfile, followUser, unfollowUser ,getUserFollowers ,getUserFollowing,  getAllUserProfiles} = require('../controllers/profileController');


    const router = express.Router();

    
    router.post('/signup', insertUser);

    
    router.post('/login', loginUser);

    

    let tokenBlacklist = [];

    
    function isTokenBlacklisted(req, res, next) {
        const token = req.headers['authorization'];

        if (tokenBlacklist.includes(token)) {
            return res.status(401).json({ message: 'Token is blacklisted, please log in again' });
        }

        next();  
    }

    router.post('/logout', Logout);

    

    router.get('/:id', getUserProfile);

    router.delete('/:id', deleteUserProfile);

    router.patch('/:id', editUserProfile); 

    router.post('/:id/follow', followUser); 
    router.post('/:id/unfollow', unfollowUser); 

    router.get('/:id/followers', getUserFollowers); 
    router.get('/:id/following', getUserFollowing);     

    router.get('/', getAllUserProfiles);

    router.use(isTokenBlacklisted);

    module.exports = router;
