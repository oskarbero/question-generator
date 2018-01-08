const path = require('path');

const getResourcePath = (name) => {
    return `${path.resolve('resources')}\\${name}`;
}

module.exports = {
    getResourcePath
}