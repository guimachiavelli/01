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
