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
        var body, text;

        body = document.getElementById('scene-body');
        body.innerHTML = '';

        if (scene.beacons[beacon].leadsTo) {
            load('scene2');
            return;
        }

        text = scene.beacons[beacon].text;
        text = createParagraphs(text);
        text.forEach(function(t){
            body.appendChild(t);
        });

        addBeaconEvents();

    }

    function enterScene(content) {
        var heading, body, text;

        heading = document.getElementById('scene-title');
        heading.innerHTML = content.title;

        body = document.getElementById('scene-body');
        text = content.beacons.description.text;
        text = createParagraphs(text);
        text.forEach(function(t){
            body.appendChild(t);
        });

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
        scene = scene || 'scene1';
        request = new XMLHttpRequest();
        request.open('GET', './data/' + scene + '.json', true);
        request.onload = insertContent;
        request.send();
    }

    function setup() {
        var heading, body;
        heading = document.createElement('h1');
        heading.setAttribute('id', 'scene-title');
        contentEl.appendChild(heading);

        body = document.createElement('div');
        body.setAttribute('id', 'scene-body');
        body.setAttribute('class', 'text-window');
        contentEl.appendChild(body);
    }


    contentEl = document.getElementById('content');

    setup();
    load();



}());
