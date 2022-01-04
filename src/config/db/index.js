const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/simple_music'
        );
        console.log('connect successful');
    } catch (error) {
        console.log('connect failed');
    }
}

module.exports = { connect };
