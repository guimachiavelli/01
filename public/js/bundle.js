(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){

    'use strict';


    var beacons = {

        update: null,

        init: function(updateFunc) {
            beacons.update = updateFunc;
        },


        onBeaconClick: function() {
            var beacon = this.id.split('-')[1];
            beacons.update(beacon);
        },

        addEvents: function() {
            var beaconEl, i, len;

            beaconEl = document.querySelectorAll('.beacon');

            for(i = 0, len = beaconEl.length; i < len; i += 1) {
                beaconEl[i].addEventListener('click', beacons.onBeaconClick);
            }
        },

        create: function(text) {
            var beaconButtons, button, buttonName;

            beaconButtons = text.match(/\[\[.+?\]\]/gi);

            if (!beaconButtons) {
                return text;
            }

            beaconButtons.forEach(function(beaconButton){
                button = document.createElement('button');

                buttonName = beaconButton.replace('[[', '').replace(']]', '');

                button = [
                    '<button class="beacon" id="beacon-' + buttonName + '">',
                        buttonName,
                    '</button>'
                ].join('');

                text = text.replace(beaconButton, button);
            });

            return text;
        }


    };


    module.exports = beacons;

}());

},{}],2:[function(require,module,exports){
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

},{"./beacons":1}],3:[function(require,module,exports){
(function(){

    'use strict';

    var scene = require('./scene');

    function setup() {
        var el, structure;
        el = document.getElementById('content');

        structure = [
            '<h1 id="scene-title" class="scene-title"></h1>',
            '<blockquote id="slogan" class="slogan"></blockquote>',
            '<div id="scene-body" class="text-window"></div>',
            '<img src="" id="illustration" class="illustration hidden">'
        ].join('\n');

        el.innerHTML = structure;
    }

    setup();
    scene.init();

}());

},{"./scene":4}],4:[function(require,module,exports){
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

},{"./beacons":1,"./content":2}]},{},[3])