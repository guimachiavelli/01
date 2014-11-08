(function(){

    'use strict';

    var fs = require('fs'),
        marked = require('marked');

    function parseMD(text) {
        var title, beacons, currentBeacon;

        text = marked.lexer(text);

        beacons = {};

        text.forEach(function(token){
            if (token.type === 'heading' && token.depth === 1) {
                title = token.text;
                return;
            }

            if (token.type === 'heading' && !beacons[token.text]) {
                currentBeacon = token.text;
                if (!beacons[currentBeacon]) {
                    beacons[currentBeacon] = [];
                }
                return;
            }



            beacons[currentBeacon].push(token.text);
        });

        return {
            title: title,
            beacons: beacons
        };

    }


    function main(dirpath) {
        var files;

        files = fs.readdirSync(dirpath);

        files.forEach(function(file){
            file = dirpath + '/' + file;
            file = fs.readFileSync(file, {encoding: 'utf8'});
            file = parseMD(file);
            file = JSON.stringify(, null, 4);

            fs.writeFileSync('./test.json', file);

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
