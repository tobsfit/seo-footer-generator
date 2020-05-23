document.querySelector('#base').addEventListener('change', (e) => {
  let content: string;
  const switcher: EventTarget = e.target;
  const switcherValue: string = (switcher as HTMLInputElement).value;
  if (switcherValue == '1') {
    content = `<object data="https://tobsfit.github.io/surfooter-generator/simple-surfooter.html"></object>`;
  } else {
    content = `<object data="https://tobsfit.github.io/surfooter-generator/complex-surfooter.html"></object>`;
  }
  document.querySelector('#clipboard').innerHTML = content
});

window.addEventListener("load", function() {
  let extern = document.querySelector("link[href='https://tobsfit.github.io/surfooter-generator/simple-surfooter.html']").import;
  document.getElementsByTagName("html")[0].replaceChild(extern.getElementsByTagName("body")[0], document.getElementsByTagName("body")[0]);
}, false);