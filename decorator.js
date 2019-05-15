function decorator(component) {
    const proto = Object.getPrototypeOf(component);

    function Decorator(component) {
        this.component = component;
    }

    Decorator.prototype = Object.create(proto);

    // new method 
    Decorator.prototype.greetings = function() {
        return 'hi';
    }

    // delegated method
    Decorator.prototype.hello = function() {
        return this.component.hello.apply(this.component, arguments);
    }

    return new Decorator(component);
}

function decorator(component) {
    component.greetings = () => {
        return component;
    }
}

module.exports = function levelSubscribe(db) {
    db.subscribe = (pattern, listener) => {
        db.on('put', (key, val) => {
            const match = Object.keys(pattern).every(
                k => (pattern[k] === val[k])
            );
            if(match) {
                listener(key, value);
            }
        })
    }

    return db;
}

const level = require('level');
const levelSubscribe = require('./levelSubscribe');

let db = level(__dirname + '/db', { valueEncoding: 'json'});
db = vevelSubscribe(db);

db.subscribe({doctype: 'tweet', laguage: 'en'}, 
            (k, val) => console.log(val)
);

db.put('1', { doctype: 'tweet', text: 'Hi', languages: 'en'});
