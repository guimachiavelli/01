(function(){
	
	'use strict';

	var fs = require('fs');

	function getFile(filepath) {
		if (!fs.existsSync(filepath)) {
			process.exit(1);
			return;
		}
		return fs.readFileSync(filepath, {encoding: 'UTF-8'});
	}
	
	function main(filepath) {
		var text, beacons;

		text = getFile(filepath);

		beacons = text.match(/\[\[.+?\]\]/gi);

		beacons.unshift('total number of beacons: ' + beacons.length);
		
		beacons = beacons.filter(function(el, index){
			return beacons.indexOf(el) === index;
		})

		beacons.unshift('unique beacons: ' + beacons.length);
		

		beacons = beacons.join('\n');

		fs.writeFileSync('test.txt', beacons);
		
	}

    function usage(code) {
        console.log('usage: node tools/getBeacons.js <md filepath>');
        process.exit(code);
    }


    if (require.main === module) {
        var args = process.argv.slice(2);

        if (args.length < 1) {
            usage(1);
        }

        main(args[0]);
    }


	main();

}());
