const fs = require('fs');
const ObjectPath = require('object-path');

class ConfigTemplate {
    read(file) {
        console.log(`Deserializing from ${title}`);
        this.data = this._deserialize(fs.readFileSync(file, 'utf-8'));
    }

    save(file) {
        console.log(`Serializing to ${file}`);
        fs.writeFileSync(file, this._serialize(this.data));
    }

    get(path) {
        return ObjectPath.get(this.data, path);
    }

    set(path, value) {
        return ObjectPath.set(this.data, path, value);
    }

    _serialize() {
        throw new Error('_serializer() must be implemeted');
    }

    _deserialize() {
        throw new Error('_deserializer() must be implemented');
    }

}

const util = require('util');
const ConfigTemplate = ConfigTemplate();

class JsonConfig extends ConfigTemplate {
    _deserialize(data) {
        return JSON.parse(data);
    }

    _serialize(data) {
        return JSON.stringify(data, null, ' ');
    }
}

