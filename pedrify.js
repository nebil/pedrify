/*
Copyright (c) 2016, Nebil Kawas García
This source code is subject to the terms of the Mozilla Public License.
You can obtain a copy of the MPL at <https://www.mozilla.org/MPL/2.0/>.
*/

(function() {
    'use strict';

    document.getElementById('button').addEventListener('click', function() {
        var inputBox = document.getElementById('message').value;
        var outputBox = document.getElementById('answer');
        outputBox.innerHTML = inputBox.pedrify();
    });

    String.prototype.replaceBy = function(string, index) {
        return this.slice(0, index) +
               string +
               this.slice(index + string.length);
    };

    String.prototype.transpose = function(index) {
        return this.slice(0, index - 1) +
               this.slice(index, index + 1) +
               this.slice(index - 1, index) +
               this.slice(index + 1);
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

        var BLACKLIST = /[.,:;?!]/g;   // a regular expression
                                      // to remove punctuation.
        var output = this.toLowerCase().replace(BLACKLIST, '');
        for (var index = 0; index < output.length; index++) {
            for (var range = 1; range <= 3; range++) {
                var substring = output.slice(index, index + range);
                output = output.replaceBy(REPLACE[substring] || substring,
                                          index);
            }
        }

        return output.capitalize();
    };
}());
