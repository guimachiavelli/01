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

    function main(){
        setup();
        scene.init();
    }

    main();

}());

},{"./scene":4}],3:[function(require,module,exports){
(function(){

    'use strict';

    var meters, meterScores;

    meterScores = {
        cum: [
            'almost empty',
            'almost empty',
            'sated',
            'sated',
            'hard',
            'harder',
            'dripping',
            'dripping',
            'about to bust',
            'cum flowing'
        ],
        spirit: [
            'danger',
            'danger',
            'very low',
            'low',
            'anarchist',
            'anarchist',
            'orgone rebel',
            'orgone rebel',
            'orgone rebel',
            'holy orgone revolutionary'
        ]
    };

    function init() {
        meters = {
            cum: 10,
            spirit: 5
        };
    }

    function update(meter, amount) {
        var score = meters[meter];
        if (!score) {
            throw new Error('invalid meter');
        }

        amount = parseInt(amount, 10) || 0;

        score += amount;
        meters[meter] = score;

        if (score > 10) {
            score = 10;
        }

        if (score < 0) {
            score = 0;
        }


    }

    function getValue(meter) {
        var score = meters[meter];
        if (!score) {
            throw new Error('invalid meter');
        }

        return meterScores[meter][score - 1];
    }


    module.exports = {
        init: init,
        update: update,
        get: getValue
    };

}());

},{}],4:[function(require,module,exports){
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

},{"./beacons":1,"./meters":3,"./textWindow":5}],5:[function(require,module,exports){
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

},{"./beacons":1}]},{},[2])