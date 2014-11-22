(function(){

    'use strict';

    var beacons = require('./beacons'),
        story = require('./content');

    var scene;

    function enterScene(content) {
        var heading, body, text, image, quote;

        heading = document.getElementById('scene-title');
        heading.innerHTML = content.title;

        body = document.getElementById('scene-body');

        text = content.beacons.description.text;
        text = story.createParagraphs(text);
        body.innerHTML = text;

        image = document.getElementById('illustration');
        image.setAttribute('class', 'illustration hidden');

        quote = document.getElementById('slogan');

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
        var content, body, text, image, quote;

        content = scene.beacons[beaconName];

        body = document.getElementById('scene-body');
        quote = document.getElementById('slogan');

        body.innerHTML = '';
        quote.innerHTML = '';

        if (content.leadsTo) {
            load(content.leadsTo);
            return;
        }

        if (content.slogan) {
            quote.innerHTML = content.slogan;
        }

        image = document.getElementById('illustration');
        image.src = '';
        image.setAttribute('class', 'illustration hidden');

        if (content.image) {
            image.src = 'imgs/' + scene.beacons[beacon].image;
            image.setAttribute('class', 'illustration');
        }

        text = content.text.slice(0);
        text = story.createParagraphs(text);

        body.innerHTML = text;

        beacons.addEvents();

    }

    function init() {
        beacons.init(update);
        load();
    }


    module.exports = {
        init: init,
        load: load,
        update: update
    };

}());
