document.querySelector('#base').addEventListener('change', function (e) {
    var content;
    var switcher = e.target;
    var switcherValue = switcher.value;
    if (switcherValue == '1') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/simple-surfooter.html', false);
        xmlhttp.send();
        content = xmlhttp.responseText;
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/complex-surfooter.html', false);
        xmlhttp.send();
        content = xmlhttp.responseText;
    }
    document.querySelector('#clipboard').innerHTML = content;
});
