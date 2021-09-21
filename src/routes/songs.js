const express = require('express');
const router = express.Router();

const songController = require('../app/controllers/SongController');

router.get('/create', songController.create);
router.post('/store', songController.store);
router.get('/:id/edit', songController.edit);
router.put('/:id', songController.update);
router.get('/:slug', songController.show);

module.exports = router;
