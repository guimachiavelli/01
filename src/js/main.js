(function(){

    'use strict';

    var scene = require('./scene');

    var contentEl;



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
    scene.init();

}());
