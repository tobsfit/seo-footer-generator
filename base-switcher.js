document.querySelector('#base').addEventListener('change', function (e) {
    var content;
    var switcher = e.target;
    var switcherValue = switcher.value;
    if (switcherValue == '1') {
        content = "<object data=\"https://tobsfit.github.io/surfooter-generator/simple-surfooter.html\"></object>";
    }
    else {
        content = "<object data=\"https://tobsfit.github.io/surfooter-generator/complex-surfooter.html\"></object>";
    }
    document.querySelector('#clipboard').innerHTML = content;
});
