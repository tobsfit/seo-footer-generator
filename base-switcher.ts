document.querySelector('#base').addEventListener('change', (e) => {
  let content: string;
  const switcher: EventTarget = e.target;
  const switcherValue: string = (switcher as HTMLInputElement).value;
  if (switcherValue == '1') {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/simple-surfooter.html', false);
    xmlhttp.send();
    content = xmlhttp.responseText;
  } else {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://tobsfit.github.io/surfooter-generator/complex-surfooter.html', false);
    xmlhttp.send();
    content = xmlhttp.responseText;
  }
  document.querySelector('#clipboard').innerHTML = content;
  console.log('insert content from switcher');
});

