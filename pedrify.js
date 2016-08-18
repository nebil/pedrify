(function() {
    'use strict';

    document.getElementById('button').addEventListener('click', function() {
        var inputBox = document.getElementById('message').value;
        var outputBox = document.getElementById('answer');
        outputBox.innerHTML = inputBox.pedrify();
    });

    String.prototype.pedrify = function() {
        // TODO
    };
}());
