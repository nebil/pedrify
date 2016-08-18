(function() {
    'use strict';

    document.getElementById('button').addEventListener('click', function() {
        var inputBox = document.getElementById('message').value;
        var outputBox = document.getElementById('answer');
        outputBox.innerHTML = inputBox.pedrify();
    });

    String.prototype.replaceBy = function(character, index) {
        return this.slice(0, index) + character + this.slice(index + 1);
    };

    String.prototype.capitalize = function() {
        return this.slice(0, 1).toUpperCase() + this.slice(1);
    };

    String.prototype.pedrify = function() {
        var REPLACE = {
            'b': 'v',
            'v': 'b',
            'z': 's',
            'á': 'a',
            'é': 'e',
            'í': 'i',
            'ó': 'o',
            'ú': 'u',
        };

        var output = this.toLowerCase();
        for (var index = 0; index < output.length; index++) {
            var character = output.slice(index, index + 1);
            output = output.replaceBy(REPLACE[character] || character, index);
        }

        return output.capitalize();
    };
}());
