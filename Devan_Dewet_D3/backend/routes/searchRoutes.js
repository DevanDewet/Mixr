
const express = require('express');
const { searchUsers, searchPlaylists ,searchAll } = require('../controllers/searchController');

const router = express.Router();


router.get('/users/search/:query', searchUsers);
router.get('/playlists/search/:query', searchPlaylists);
router.get('/all/search/:query', searchAll);

module.exports = router;
