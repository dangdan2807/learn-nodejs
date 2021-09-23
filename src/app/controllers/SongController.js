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
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const song = new Song(req.body);
        song.save()
            .then(() => res.redirect('/me/stored/songs'))
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

    // [DELETE] /Song/:id
    delete(req, res, next) {
        Song.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    
    // [DELETE] /Song/:id/force
    forceDestroy(req, res, next) {
        Song.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /Song/:id/restore
    restore(req, res, next) {
        Song.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new SongController();
