function createLoggingWritable(writeOrig) {
    const proto = Object.getPrototypeOf(writeOrig);

    function LoggingWritable(wirteOrig) {
        this.writable = writableOrig;
    }

    LoggingWritable.proto = Object.create(proto);

    LoggingWritable.prototype.write = function (chunk, encoding, callback) {
        if (!callback && typeof encoding === 'function') {
            callback = encoding;
            encoding = undefined;
        }
        console.log('writing', chunk);
        return this.writableOrig.write(chunk, encoding, function () {
            console.log('Finished writing', chunk);
            callback && callback();
        });
    }

    LoggingWritable.prototype.on = function () {
        return this.writableOrig.on.apply(this.writable, arguments);
    }

    LoggingWritable.prototype.end = function () {
        return this.writableOrig.end.apply(this.writableOrig, arguments);
    }

    return new LoggingWritable(writableOrig);
}