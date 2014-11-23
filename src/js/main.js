(function(){

    'use strict';

    var scene = require('./scene');

    function setup() {
        var el, structure;
        el = document.getElementById('content');

        structure = [
            '<h1 id="scene-title" class="scene-title"></h1>',
            '<div class="points">',
                'status: <span id="cum"></span> <span id="spirit"></span>',
            '</div>',
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
