(function(){

    'use strict';

    var fs = require('fs'),
        marked = require('marked'),
        string = require('string');

    function makeSlug(title) {
        return string(title)
                .toLowerCase()
                .stripPunctuation()
                .dasherize()
                .s;
    }

    function parseMD(text) {
        var title, beacons, currentBeacon, action, scenes;

        text = marked.lexer(text);

        scenes = [];

        beacons = {};

        text.forEach(function(token, index){
            if (token.text === 'leads to') {
                if (scenes.indexOf(text[index + 1].text) > -1) {
                    return;
                }
                scenes.push(text[index + 1].text);
            }
        });

        return scenes;

    }


    function main(dirpath) {
        var files, scenes;

        files = fs.readdirSync(dirpath);

        scenes = [];

        files.forEach(function(file, index){
            file = dirpath + '/' + file;
            file = fs.readFileSync(file, {encoding: 'utf8'});
            file = parseMD(file);
            scenes = scenes.concat(file);
        });

        scenes = JSON.stringify(scenes, null, 4);
        fs.writeFileSync('../src/report.json', scenes);

    }

    function usage(code) {
        console.log('usage: node tools/generateJson.js <dirpath>');
        process.exit(code);
    }

    if (require.main === module) {
        var args = process.argv.slice(2);

        if (args.length < 1) {
            usage(1);
        }

        main(args[0]);
    }


}());
