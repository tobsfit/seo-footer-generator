"use strict";
exports.__esModule = true;
exports.switcher = void 0;
function switcher() {
    document.querySelector('#base').addEventListener('change', function (e) {
        updateContent();
    });
    document.querySelector('#num-columns').addEventListener('change', function (e) {
        updateContent();
    });
    function updateContent() {
        var content;
        var columnWrapper = document.querySelector('.dialog__columns');
        var numColumns = parseInt(document.querySelector('#num-columns').value);
        var switcher = parseInt(document.querySelector('#base').value);
        if (switcher == 1) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/simple-surfooter.html', false);
            xmlhttp.send();
            content = xmlhttp.responseText;
            columnWrapper.style.display = "none";
        }
        else {
            columnWrapper.style.display = "block";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', "https://tobsfit.github.io/surfooter-generator/complex-surfooter-" + numColumns + ".html", false);
            xmlhttp.send();
            content = xmlhttp.responseText;
        }
        document.querySelector('#clipboard').innerHTML = content;
        console.log('insert content from switcher');
    }
}
exports.switcher = switcher;
