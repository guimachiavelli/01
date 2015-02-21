(function(){

    'use strict';

    var beacons = require('./beacons'),
        textWindow = require('./textWindow');

    var scene, heading, body, illustration, quote;


    function updateScene() {
        var self = this;
        if (self.status < 200 && self.status > 400) {
            return;
        }

        scene = JSON.parse(self.responseText);

        update('description');
    }

    function load(scene) {
        var request;
        scene = scene || 'intro';
        request = new XMLHttpRequest();
        request.open('GET', './data/' + scene + '.json', true);
        request.onload = updateScene;
        request.send();
        request = null;
    }

    function updateIllustration(image) {
        illustration.src = '';
        illustration.className = 'illustration hidden';

        if (image) {
            illustration.src = 'imgs/' + image;
            illustration.className = 'illustration';
        }
    }

    function updateContent(text) {
        text = text.slice(0);
        text = textWindow.createParagraphs(text);

        body.innerHTML = text;
    }

    function updateSlogan(slogan) {
        slogan = slogan || '';
        quote.innerHTML = slogan;
    }

    function update(beaconName) {
        var content = scene.beacons[beaconName];

        if (beaconName === 'description') {
            heading.innerHTML = scene.title;
        }

        if (content.leadsTo) {
            load(content.leadsTo);
            return;
        }

        updateIllustration(content.ending);
        updateSlogan(content.slogan);
        updateContent(content.text);

        beacons.addEvents();
    }

    function init() {
        heading = document.getElementById('scene-title');
        quote = document.getElementById('slogan');
        body = document.getElementById('scene-body');
        illustration = document.getElementById('illustration');
        beacons.init(update);
        load();
    }

    module.exports = {
        init: init,
        load: load,
        update: update
    };

}());
