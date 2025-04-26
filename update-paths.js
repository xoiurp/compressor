const fs = require('fs');

const htmlFile = 'index.html';
const repoBase = 'https://xoiurp.github.io/compressor';

const html = fs.readFileSync(htmlFile, 'utf8');

const updatedHtml = html
  // Atualiza links para CSS
  .replace(/href="css\//g, `href="${repoBase}/css/`)
  
  // Atualiza links para JS  
  .replace(/src="js\//g, `src="${repoBase}/js/`)
  
  // Atualiza links para imagens
  .replace(/src="images\//g, `src="${repoBase}/images/`)
  .replace(/url\(images\//g, `url(${repoBase}/images/`)
  .replace(/content="images\//g, `content="${repoBase}/images/`);

fs.writeFileSync('index.html', updatedHtml);