/*
Copyright (c) 2016, Nebil Kawas García
This source code is subject to the terms of the Mozilla Public License.
You can obtain a copy of the MPL at <https://www.mozilla.org/MPL/2.0/>.
*/

(function() {
    'use strict';

    new Clipboard('#copy');
    document.getElementById('pedrify').addEventListener('click', function() {
        var inputBox = document.getElementById('message').value;
        var outputBox = document.getElementById('answer');
        outputBox.innerHTML = inputBox.pedrify();
    });

    function getRandomInt(maximum) {
        return Math.floor(Math.random() * maximum) + 1;
    }

    function getRandomDigit() {
        return getRandomInt(10) - 1;
    }

    String.prototype.digitize = function(index) {
        return this.slice(0, index) +
               getRandomDigit() +
               this.slice(index);
    };

    String.prototype.replaceBy = function(string, index) {
        return this.slice(0, index) +
               string +
               this.slice(index + string.length);
    };

    String.prototype.includesWhitespace = function() {
        return this.indexOf(' ') >= 0;
    };

    String.prototype.transpose = function(index) {
        var left  = index - 1;
        var right = index + 1;
        var includesWhitespace = this.slice(left, right).includesWhitespace();
        var isOutOfBounds = index < 1 || index > this.length;

        if (includesWhitespace || isOutOfBounds) {
            return this;
        } else {
            return this.slice(0, left) +
                   this.slice(index, right) +
                   this.slice(left , index) +
                   this.slice(right);
        }
    };

    String.prototype.randomTranspose = function(amount) {
        var output = this;
        for (var step = 0; step < amount; step++) {
            var index = getRandomInt(this.length);
            output = output.transpose(index);
        }

        return output;
    };

    String.prototype.capitalize = function() {
        return this.slice(0, 1).toUpperCase() + this.slice(1);
    };

    String.prototype.pedrify = function() {
        var REPLACE = {
            // one-letter replacement.
            'b': 'v',
            'v': 'b',
            'z': 's',
            'á': 'a',
            'é': 'e',
            'í': 'i',
            'ó': 'o',
            'ú': 'u',
            // two-letter replacement.
            'ce': 'se',
            'ci': 'si',
            'xp': 'sp',
            'xq': 'sq',
            'xt': 'st',
            // three-letter replacement.
            'xca': 'sca',
            'xcl': 'scl',
            'xco': 'sco',
            'xcr': 'scr',
            'xcu': 'scu',
        };

        var TRANSPOSE = 30;
        var BLACKLIST = /[.,:;?!]/g;   // a regular expression
                                      // to remove punctuation.
        var output = this.toLowerCase().replace(BLACKLIST, '');
        for (var index = 0; index < output.length; index++) {
            for (var range = 1; range <= 3; range++) {
                var substring = output.slice(index, index + range);
                var replacement = REPLACE[substring];
                if (replacement) {
                    output = output.replaceBy(replacement, index);
                    break;
                }
            }
        }

        return output.randomTranspose(this.length / TRANSPOSE).capitalize();
    };
}());
