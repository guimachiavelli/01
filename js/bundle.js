(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){

    'use strict';

    var contentEl, scene;


    function onBeaconClick() {
        var beacon = this.id.split('-')[1];
        update(beacon);
    }

    function addBeaconEvents() {
        var beaconEl, i, len;

        beaconEl = document.querySelectorAll('.beacon');

        for(i = 0, len = beaconEl.length; i < len; i += 1) {
            beaconEl[i].addEventListener('click', onBeaconClick);
        }

    }

    function createBeacon(text) {
        var beacons, button, buttonName;

        beacons = text.match(/\[\[.+?\]\]/gi);

        if (!beacons) {
            return text;
        }

        beacons.forEach(function(beacon, index){
            button = document.createElement('button');

            buttonName = beacon.replace('[[', '').replace(']]', '');

            button = [
                '<button class="beacon" id="beacon-' + buttonName + '">',
                    buttonName,
                '</button>'
            ].join('');

            text = text.replace(beacon, button);
        });

        return text;

    }

    function createParagraphs(text) {
        var len, i, newText, result;

        for (i = 0, len = text.length; i < len; i += 1) {
            result = document.createElement('p');
            newText = createBeacon(text[i]);
            result.innerHTML = newText;
            text[i] = result;
        }

        return text;
    }

    function update(beacon) {
        var body, text, image, quote;

        body = document.getElementById('scene-body');
        quote = document.getElementById('slogan');

        body.innerHTML = '';
        quote.innerHTML = '';

        if (scene.beacons[beacon].leadsTo) {
            load(scene.beacons[beacon].leadsTo);
            return;
        }

        if (scene.beacons[beacon].slogan) {
            quote.innerHTML = scene.beacons[beacon].slogan;
        }


        image = document.getElementById('illustration');
        image.src = '';
        image.setAttribute('class', 'illustration hidden');

        if (scene.beacons[beacon].image) {
            image.src = 'imgs/' + scene.beacons[beacon].image;
            image.setAttribute('class', 'illustration');
        }




        text = scene.beacons[beacon].text.slice(0);
        text = createParagraphs(text);
        text.forEach(function(t){
            body.appendChild(t);
        });


        addBeaconEvents();

    }

    function enterScene(content) {
        var heading, body, text, image, quote;

        heading = document.getElementById('scene-title');
        heading.innerHTML = content.title;

        body = document.getElementById('scene-body');

        text = content.beacons.description.text;
        text = createParagraphs(text);
        text.forEach(function(t){
            body.appendChild(t);
        });

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

        addBeaconEvents();
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

    function setup() {
        var heading, body, image, quote;

        heading = document.createElement('h1');
        heading.setAttribute('id', 'scene-title');
        contentEl.appendChild(heading);

        quote = document.createElement('blockquote');
        quote.setAttribute('id', 'slogan');
        quote.setAttribute('class', 'slogan');
        contentEl.appendChild(quote);



        body = document.createElement('div');
        body.setAttribute('id', 'scene-body');
        body.setAttribute('class', 'text-window');
        contentEl.appendChild(body);

        image = document.createElement('img');
        image.setAttribute('id', 'illustration');
        image.setAttribute('class', 'illustration hidden');
        contentEl.appendChild(image);

    }


    contentEl = document.getElementById('content');

    setup();
    load();



}());

},{}]},{},[1])