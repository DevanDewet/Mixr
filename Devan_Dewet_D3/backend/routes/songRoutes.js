
const express = require('express');
const { createSong, deleteSong,getAllSongs ,updateSong } = require('../controllers/songController');

const router = express.Router();


router.post('/create', createSong);


router.delete('/:id', deleteSong);

router.get('/', getAllSongs);


router.patch('/:id', updateSong);

module.exports = router;
