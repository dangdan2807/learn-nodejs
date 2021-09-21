const newsRoute = require('./news');
const songsRoute = require('./songs');
const siteRoute = require('./site');
const meRoute = require('./me');

function route(app) {
    app.use('/me', meRoute);
    app.use('/news', newsRoute);
    app.use('/songs', songsRoute);
    app.use('/', siteRoute);
}

module.exports = route;
