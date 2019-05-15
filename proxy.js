function createProxy(subject) {
    const proto = Object.getPrototypeOf(subject);

    function Proxy(subject) {
        this.subject = subject;
    }

    Proxy.prototype = Object.create(proto);

    // Proxied method 
    Proxy.prototype.hello = function() {
        return this.subject.hello() + 'world';
    }

    // Delegated method 
    Proxy.prototype.goodbye = function() {
        return this.subject.goodbye
          .apply(this.subject, arguments);
    }

    return new Proxy(subject);
}

module.exports = createProxy;

function createLoggingWritable(writableOrig) {
    const proto = Object.getPrototypeOf(writableOrig);

    function LoggingWritable(writableOrig) {
        this.writableOrig = writableOrig;
    }

    LoggingWritable.prototype = Object.create(proto);

    LoggingWritable.prototype.write = function(chunk, encoding, callback) {
        if(!callback && typeof encoding === 'function') {
            callback = encoding;
            encoding = undefined;
        }
        console.log("writing ", chunk);
        return this.writableOrig.write(chunk, encoding, function() {
            console.log("Finished writing ", chunk);
        });
    }

    LoggingWritable.prototype.on = function() {
        return this.writableOrig.on
          .apply(this.writableOrig, arguments);
    }

    LoggingWritable.prototype.end = function() {
        return this.writableOrig.end 
          .apply(this.writableOrig, arguments);
    }

    return new LoggingWritable;
}

const fs = require('fs');

const writable = fs.createWriteStream('text.txt');
const writableProxy = createLoggingWritable(writable);

writable.write('First chunk');
writable.write('Second chunk');
writable.write('This is not logged');
writable.end();

const scientist = {
    name: "nickola",
    surname: "tesla"
};

const upperCaseScientist = new Proxy(scientist, {
    get: (target, property) => target[property].toUpperCase()
});

console.log(upperCaseScientist.name, uppperCaseScientist.surname);

const evenNumbers = new Proxy([], {
    get: (target, index) => index * 2,
    has: (target, number) => number % 2 === 0
});

console.log(2 in evenNumbers);