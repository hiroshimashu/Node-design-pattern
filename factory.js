// Factory pattern

function createImage(name) {
    if(name.match(/\.jpeg$/)) {
        return new JpegImage(name);
    } else if (name.match(/\.gif$/)) {
        return new GifImage(name);
    } else if (name.match(/\.png$/)) {
        return new PngImage(name);
    } else {
        throw new Exception('Unsupported format');
    }
}

function createPerson(name) {
    const privateProperties = {};

    const person = {
        setName: name => {
            if(!name) throw Error("A person must have a name");
            privateProperties.name = name;
        },
        getName: () => {
            return privateProperties.name;
        }
    }

    person.setName(name);
    return person;
}

class Profiler {
    constructor(label) {
        this.label = label;
        this.lastTime = null;
    }

    start() {
        this.lastTime = process.hrtime();
    }

    end() {
        const diff = process.hrtime(this.lastTime);
        console.log(`"${this.label}" took ${diff[0]} seconds and ${diff[1]} nano seconds`)
    }
}

modeule.exports = function(label) {
    if(process.env.NODE_ENV === "production") {
        return {
            start: function() {},
            end: function() {}
        }
    } else if (process.env.NODE_ENV === "deveploment"){
        return new Profiler(label);
    } else {
        throw new Error('Must set NODE_ENV');
    }
}