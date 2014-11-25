(function(){

    'use strict';

    var beacons = require('./beacons'),
        meters = require('./meters'),
        textWindow = require('./textWindow');

    var scene, heading, body, illustration, quote, cumMeter, spiritMeter;


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

    function updateMeters(cum, spirit) {
        cum = cum || 0;
        spirit = spirit || 0;

        meters.update('cum', cum);
        meters.update('spirit', spirit);

        cumMeter.innerHTML = meters.get('cum');
        spiritMeter.innerHTML = meters.get('spirit');
    }

    function update(beaconName) {
        var content = scene.beacons[beaconName];

        //updateMeters(content.cum, content.spirit);

        if (beaconName === 'description') {
            heading.innerHTML = scene.title;
        }

        if (content.leadsTo) {
            load(content.leadsTo);
            return;
        }

        updateIllustration(content.image);
        updateSlogan(content.slogan);
        updateContent(content.text);

        beacons.addEvents();

    }

    function init() {
        heading = document.getElementById('scene-title');
        quote = document.getElementById('slogan');
        body = document.getElementById('scene-body');
        illustration = document.getElementById('illustration');
        cumMeter = document.getElementById('cum');
        spiritMeter = document.getElementById('spirit');
        beacons.init(update);
        //meters.init();
        load();
    }


    module.exports = {
        init: init,
        load: load,
        update: update
    };

}());
