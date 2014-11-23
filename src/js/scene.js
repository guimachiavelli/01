(function(){

    'use strict';

    var beacons = require('./beacons'),
        story = require('./content');

    var scene, heading, body, text, image, quote;

    function enterScene(content) {
        var text;

        heading.innerHTML = content.title;

        text = content.beacons.description.text;
        text = story.createParagraphs(text);
        body.innerHTML = text;

        image.setAttribute('class', 'illustration hidden');

        if (content.beacons.description.image) {
            image.src = 'imgs/' + content.beacons.description.image;
            image.setAttribute('class', 'illustration');
        }

        if (content.beacons.description.slogan) {
            quote.innerHTML = content.beacons.description.slogan;
        }

        beacons.addEvents();
    }

    function insertContent() {
        if (this.status < 200 && this.status > 400) {
            return;
        }
        var content;
        content = JSON.parse(this.responseText);

        scene = content;

        enterScene(content);
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
        image.setAttribute('class', 'illustration hidden');

        if (content.image) {
            image.src = 'imgs/' + content.image;
            image.setAttribute('class', 'illustration');
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
