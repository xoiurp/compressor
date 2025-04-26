const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Elementos que queremos remover
const elementsToRemove = [
    '.site-header-v4rd',
    '.site-slide-menu',
    '.xm-navbar',
    '.compare__out-box',
    '.navigation__group',
    '.navigation__shortcut',
    '#truste-consent-required',
    '#consent_blackbar',
    '.site-slide-menu__controller',
    '.site-slide-menu__overlay'
];

// Função principal para limpar o HTML
function cleanHTML(filePath) {
    console.log('Lendo arquivo HTML...');
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    console.log('Removendo elementos desnecessários...');
    
    // Remove os elementos indesejados
    elementsToRemove.forEach(selector => {
        $(selector).remove();
    });

    // Ajusta o container principal
    $('.xm-page-area').css({
        'padding': '0',
        'margin': '0'
    });

    // Ajusta o conteúdo principal
    $('.overview-con').css({
        'margin-top': '0'
    });

    // Atualiza o arquivo
    console.log('Salvando arquivo modificado...');
    fs.writeFileSync(filePath, $.html());
}

// Executa o script
const htmlFile = process.argv[2] || 'index.html';
const filePath = path.resolve(htmlFile);

if (!fs.existsSync(filePath)) {
    console.error('Arquivo HTML não encontrado!');
    process.exit(1);
}

console.log('Iniciando limpeza do HTML...');
cleanHTML(filePath);
console.log('HTML limpo com sucesso!');