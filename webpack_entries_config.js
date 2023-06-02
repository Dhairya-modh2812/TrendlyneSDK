var path = require('path');
const appConfigs = require('./app.config.js')


const { apps=[] } = appConfigs;
const entries = apps.reduce((accumulator, item) => ({ ...accumulator, [item.entryPoint]: path.join(__dirname, `src/${item.directory}`, 'index.js')}), {})

module.exports = {
    entries: entries
};
