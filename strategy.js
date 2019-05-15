const fs = require('fs');
const ObjectPath = require('object-path');

class Config {
    constructor(strategy) {
        this.data = {};
        this.strategy = strategy;
    }

    get(path) {
        return ObjectPath.get(this.data, path);
    }

    set(path, value) {
        return ObjectPath(this.data, path, value);
    }

    read(file) {
        console.log(`Deserializing from ${file}`);
        this.data = this.strategy.deserialize(fs.readFileSync(file, 'utf-8'));
    }

    save(file) {
        console.log(`Serializing to ${file}`);
        fs.writeFileSync(file, this.strategy.serialize(this.data));
    }
}

module.exports = Config;


module.exports.json = {
    deserialize: data => JSON.parse(data),
    serialize: data => JSON.stringify(data, null, ' ')
}

module.exports.ini = {
    deserialize: data => ini.parse(data),
    serialize: data => ini.stringify(data)
}

const strategies = require('./strategies');
