import beautifyString from '../format-document/beautify-string';

const renderHtml = (savedData: any): string => {
  const blocks = savedData.blocks;
  const css = `<style id="surfooter__styles">${document.querySelector('#clipboard__styling').innerHTML}</style>`;
  let html = css;
  html += `<div class="surfooter">`
  for (let block of blocks) {
    let { type, data } = <any>block;
    switch (type) {
      case 'header':
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case 'paragraph':
        html += `<p>${block.data.text}</p>`;
        break;
      case 'delimiter':
        html += '<hr />';
        break;
      case 'image':
        html += `<img class="img-fluid" src="${block.data.url}" title="${block.data.caption}" alt="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case 'list':
        html += '<ul>';
        block.data.items.forEach(function (li: any) {
          html += `<li>${li}</li>`;
        });
        html += '</ul>';
        break;
      case 'checklist':
        html += '<div class="surfooter__checkboxes">';
        block.data.items.forEach(function (item: any) {
          html += `
            <div class="surfooter__checkbox">
              <input type="checkbox" id="${item.text}" name="${item.text}" ${item.checked ? 'checked' : ''}>
              <label for="${item.text}">${item.text}</label>
            </div>`
        });
        html += '</div>';
        break;
      case 'quote':
        html += '<div class="surfooter__quote">';
        html += `<blockquote ${block.data.alignment ? `style="text-align: ${block.data.alignment}` : ''}">
          ${block.data.caption ? '<span>Author: ' + block.data.caption + '</span>' : ''}
          </blockquote>`;
        html += '</div>';
        break;
      case 'warning':
        html += `<div class="surfooter__warning">
            <div class="surfooter__warning__title">${block.data.title}</div>
            <div class="surfooter__warning__message">${block.data.message}</div>
          </div>`;
        break;
      case 'code':
        html += `<textarea class="surfooter__code">${block.data.code}</textarea>`;
        break;
      case 'seofaq':
        html += `<script type="application/ld+json">${block.data.content}</script>`;
        break;
      case 'table':
        html += '<div style="overflow-x: scroll">';
        html += '<table class="surfooter__table" style="width:100%">';
        block.data.content.forEach(function (tableRow: any, index: number) {
          html += '<tr>';
          tableRow.forEach(function (tableCol: any) {
            if (index === 0) {
              html += `<th>${tableCol}</th>`;
            } else {
              html += `<td>${tableCol}</td>`;
            }
          });
          html += '</tr>';
        });
        html += '</table>';
        html += '</div>';
        break;
      default:
        console.warn('Unknown block type', block.type);
        console.warn(block);
        break;
    }
  }
  html += `</div>`;
  beautifyString(html);
  return html;
}

export default renderHtml;