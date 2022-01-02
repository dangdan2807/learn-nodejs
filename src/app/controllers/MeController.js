const Song = require('../../Models/Song');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/songs
    storedSongs(req, res, next) {
        let songQuery = Song.find({});

        // res.json(res.locals._sort);
        if (req.query.hasOwnProperty('_sort')) {
            songQuery = songQuery.sort({
                [req.query.column]: req.query.type
            });
        }

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
}

module.exports = new MeController();
