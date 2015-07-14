(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return (root.sms = factory());
        });
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.sms = factory();
    }
}(this, function () {
    var https = require('https');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    return function (item, message) {
        message = encodeURI(message);
        https.get('https://smsapi.free-mobile.fr/sendmsg?user=' + item.id + '&pass=' + item.tocken + '&msg=' + message, function (res) {
          res.resume();
        });
    }
}));
