(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return (root.filesystem = factory());
        });
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.filesystem = factory();
    }
}(this, function () {
    var fs = require('fs'),
        path = require('path'),
        file = path.dirname(process.execPath) + '/keys.json';

    return {
        get: function () {
            if(!fs.existsSync(file)) {
                return [];
            }
            return JSON.parse(fs.readFileSync(file));
        },
        set: function (data, cb) {
            data.forEach(function (item) {
                delete item.$$hashKey;
            });
            fs.writeFile(file, JSON.stringify(data), function (err) {
                if (typeof cb === 'function'){
                    cb(err);
                }
            });
        },
        remove: function (cb) {
            fs.unlink(file, function (err) {
                if (typeof cb === 'function'){
                    cb(err);
                }
            });
        }
    }
}));
