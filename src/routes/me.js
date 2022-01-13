const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/songs', meController.storedSongs);
router.get('/trash/songs', meController.trashSongs);
router.get('/logout', meController.logout);

module.exports = router;
