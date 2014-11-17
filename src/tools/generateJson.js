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
                if (action === 'leadsTo') {
                    beacons[currentBeacon][action] = makeSlug(text[index + 1].text);
                } else {
                    beacons[currentBeacon][action] = text[index + 1].text;
                }
            }

            if (token.type === 'paragraph') {
                if (text[index -1].depth && text[index - 1].depth > 2) {
                    return;
                }
                beacons[currentBeacon].text.push(token.text);
            }

        });

        return {
            title: title,
            slug: makeSlug(title),
            beacons: beacons
        };

    }


    function main(dirpath) {
        var files, filename;

        files = fs.readdirSync(dirpath);

        files.forEach(function(file, index){
            file = dirpath + '/' + file;
            file = fs.readFileSync(file, {encoding: 'utf8'});
            file = parseMD(file);
            filename = file.slug;
            file = JSON.stringify(file, null, 4);

            fs.writeFileSync('../public/data/' + filename + '.json', file);

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
