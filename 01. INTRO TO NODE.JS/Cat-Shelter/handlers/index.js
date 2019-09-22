const homeHendler = require('./home');
const staticFiles = require('./static-files');
const catHendler = require('./cat');

module.exports = [homeHendler, staticFiles, catHendler];