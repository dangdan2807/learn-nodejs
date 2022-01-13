const Song = require('../../Models/Song');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/songs
    storedSongs(req, res, next) {
        let songQuery = Song.find({}).sortable(req);

        Promise.all([songQuery, Song.countDocumentsDeleted()])
            .then(([songs, deletedCount]) => {
                res.render('me/stored-songs', {
                    deletedCount,
                    songs: multipleMongooseToObject(songs),
                });
            })
            .catch(next);
    }

    // [GET] /me/trash/songs
    trashSongs(req, res, next) {
        Song.findDeleted({})
            .then((songs) => {
                res.render('me/trash-songs', { songs: multipleMongooseToObject(songs) });
            })
            .catch(next);
    }

    // [GET] /me/logout
    logout(req, res, next) {
        res.render('me/comingSoon');
    }
}

module.exports = new MeController();
