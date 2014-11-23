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
