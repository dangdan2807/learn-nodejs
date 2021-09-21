const Song = require('../../Models/Song');
const { mongooseToObject } = require('../../util/mongoose');

class SongController {
    // [GET] /Song/:slug
    show(req, res, next) {
        Song.findOne({ slug: req.params.slug })
            .then((song) => {
                res.render('songs/show', { song: mongooseToObject(song) });
            })
            .catch(next);
    }

    // [GET] /Song/create
    create(req, res) {
        res.render('songs/create');
    }

    // [POST] /Song/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const song = new Song(formData);
        song.save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    // [GET] /Song/:id/edit
    edit(req, res, next) {
        Song.findById(req.params.id)
            .then((song) => {
                res.render('songs/edit', { song: mongooseToObject(song) });
            })
            .catch(next);
    }

    // [PUT] /Song/:id
    update(req, res, next) {
        Song.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/songs'))
            .catch(next);
    }
}

module.exports = new SongController();
