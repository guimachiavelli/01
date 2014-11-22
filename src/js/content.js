(function(){

    'use strict';

    var beacons = require('./beacons');

    function createParagraphs(text) {
        var len, i, result;

        for (i = 0, len = text.length; i < len; i += 1) {
            result = '<p>' + beacons.create(text[i]) + '</p>';
            text[i] = result;
        }

        return text.join('\n');
    }

    module.exports = {
        createParagraphs: createParagraphs
    };


}());
