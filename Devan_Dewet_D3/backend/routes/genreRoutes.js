 
 const express = require('express');
 const { getGenres,addGenre, removeGenre} = require('../controllers/genreController');
 const router = express.Router();
 

 
 router.get('/genres', getGenres);
 router.post('/add', addGenre); 
 router.delete('/remove/:name', removeGenre);

 module.exports = router;