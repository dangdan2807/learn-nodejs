const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-Delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const SongSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, requireD: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String },
        videoId: { type: String, required: true },
        singer: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

// custom query helpers
SongSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

// add plugin
mongoose.plugin(slug);
SongSchema.plugin(AutoIncrement);
SongSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Song', SongSchema);
