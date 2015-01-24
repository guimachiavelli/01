(function(){
    /* jshint node: true */

    'use strict';

    var fs = require('fs');

    function emptyText(text) {
        return text[0] === 'none';
    }



    function parse(file) {
        var title, beacon, text, leadsTo, leadsToPath;
        file = JSON.parse(file);
        title = file.title;
        file = file.beacons;

        for (beacon in file) {
            text = file[beacon].text;
            leadsTo = file[beacon].leadsTo;
            leadsToPath = process.cwd() + '/public/data/' + leadsTo + '.json';

            if (emptyText(text)) {
                console.log('missing text on "' + title + '" at "' + beacon + '"');
            }

            if (leadsTo !== undefined && fs.existsSync(leadsToPath) === false) {
                console.log('missing scene: ' + leadsTo);
            }
        }
    }

    function main(dirpath) {
        var files, scenes;

        files = fs.readdirSync(dirpath);

        scenes = [];

        files.forEach(function(file){
            if (file.lastIndexOf('.json') < 0) { return; }
            file = dirpath + '/' + file;
            file = fs.readFileSync(file, {encoding: 'utf8'});
            file = parse(file);
            //scenes = scenes.concat(file);
        });

        //scenes = JSON.stringify(scenes, null, 4);
        //fs.writeFileSync('../src/report.json', scenes);

    }

    if (require.main === module) {
        var args = process.argv.slice(2);

        if (args.length < 1) {
            console.log('using default folder, cwd + /public/data');
            args[0] = process.cwd() + '/public/data';
        }

        main(args[0]);
    }

}());
