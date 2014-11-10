(function(){

    'use strict';

    var fs = require('fs'),
        marked = require('marked'),
        string = require('string');

    function parseMD(text) {
        var title, beacons, currentBeacon, action;

        text = marked.lexer(text);

        beacons = {};

        text.forEach(function(token, index){
            if (token.depth === 1) {
                title = token.text;
                return;
            }

            if (token.depth === 2) {
                currentBeacon = token.text;
                if (!beacons[currentBeacon]) {
                    beacons[currentBeacon] = {
                        text: []
                    };
                }
                return;
            }

            if (token.depth === 3) {
                action = token.text;
                action = string(action).camelize().s;
                beacons[currentBeacon][action] = text[index + 1].text;
            }

            if (token.type === 'paragraph' && !text[index - 1].depth < 2) {
                beacons[currentBeacon].text.push(token.text);
            }

        });

        return {
            title: title,
            beacons: beacons
        };

    }


    function main(dirpath) {
        var files;

        files = fs.readdirSync(dirpath);

        files.forEach(function(file, index){
            file = dirpath + '/' + file;
            file = fs.readFileSync(file, {encoding: 'utf8'});
            file = parseMD(file);
            file = JSON.stringify(file, null, 4);

            fs.writeFileSync('../public/data/scene' + (index + 1) + '.json', file);

        });

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
