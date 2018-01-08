
const {configure, getLogger } = require('log4js');

const initLogger = (options) => {
    const defaults = {
        appenders: { what: { type: 'file', filename: './logs/what.log' } },
        categories: { default: { appenders: ['what'], level: 'info' } }
    };
    configure(options ? options : defaults);
    return getLogger('what');
}

module.exports = initLogger;