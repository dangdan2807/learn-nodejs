const Song = require('../../Models/Song');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/songs
    storedSongs(req, res, next) {
        Song.find({})
            .then((songs) => {
                res.render('me/stored-songs', { songs: multipleMongooseToObject(songs) });
            })
            .catch(next);
    }
}

module.exports = new MeController();