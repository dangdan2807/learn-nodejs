const Song = require('../../Models/Song');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res) {
        Song.find({})
            .then((songs) => {
                res.render('home', {
                    songs: multipleMongooseToObject(songs)
                });
            })
            .catch((err) => next(err));
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
