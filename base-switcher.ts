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