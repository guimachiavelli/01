(function(){

    'use strict';

    var beacons = require('./beacons'),
        story = require('./content');

    var scene, heading, body, image, quote, cumMeter, spiritMeter,
        cum, spirit;


    function insertContent() {
        if (this.status < 200 && this.status > 400) {
            return;
        }

        scene = JSON.parse(this.responseText);

        update('description');
    }


    function load(scene) {
        var request;
        scene = scene || 'intro';
        request = new XMLHttpRequest();
        request.open('GET', './data/' + scene + '.json', true);
        request.onload = insertContent;
        request.send();
    }


    function update(beaconName) {
        var content, text;

        if (beaconName === 'description') {
            heading.innerHTML = scene.title;
        }

        content = scene.beacons[beaconName];

        if (content.leadsTo) {
            load(content.leadsTo);
            return;
        }

        body.innerHTML = '';
        quote.innerHTML = '';

        if (content.slogan) {
            quote.innerHTML = content.slogan;
        }

        image.src = '';
        image.className = 'illustration hidden';

        if (content.image) {
            image.src = 'imgs/' + content.image;
            image.className = 'illustration';
        }

        text = content.text.slice(0);
        text = story.createParagraphs(text);

        body.innerHTML = text;

        beacons.addEvents();

    }

    function init() {
        heading = document.getElementById('scene-title');
        quote = document.getElementById('slogan');
        body = document.getElementById('scene-body');
        image = document.getElementById('illustration');
        beacons.init(update);
        load();
    }


    module.exports = {
        init: init,
        load: load,
        update: update
    };

}());
