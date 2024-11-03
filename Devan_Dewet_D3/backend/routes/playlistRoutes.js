const express = require('express');
const { createPlaylist, deletePlaylist, getUserPlaylists, getPlaylistById, editPlaylist, addSongToPlaylist ,getGenres} = require('../controllers/playlistController');
const router = express.Router();


router.post('/create', createPlaylist);


router.delete('/:id', deletePlaylist);


router.get('/user/:userId', getUserPlaylists);


router.get('/:id', getPlaylistById);


router.put('/:id', editPlaylist);


router.post('/:id/songs', addSongToPlaylist);

router.get('/genres', getGenres);

module.exports = router;