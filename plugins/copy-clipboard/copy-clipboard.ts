export default function (html: string): void {
  const copyListener = (e: any) => {
    e.clipboardData.setData('text/html', html);
    e.clipboardData.setData('text/plain', html);
    e.preventDefault();
  };
  document.addEventListener('copy', copyListener);
  document.execCommand('copy');
  document.removeEventListener('copy', copyListener);
}
