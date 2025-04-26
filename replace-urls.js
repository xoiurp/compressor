const fs = require('fs');
const path = require('path');

// Função para substituir URLs
function replaceUrls(content) {
  // Substituir src e href mantendo caminhos locais
  content = content.replace(/src="(?:https?:)?\/\/[^"]+\/([^"]+)"/g, 'src="$1"');
  content = content.replace(/href="(?:https?:)?\/\/[^"]+\/([^"]+)"/g, 'href="$1"');
  
  // Substituir URLs absolutas por relativas
  content = content.replace(/(?:https?:)?\/\/[^"'\s>]+/g, (match) => {
    const filename = path.basename(match);
    if (filename.includes('.')) {
      return filename;
    }
    return match;
  });

  return content;
}

// Função para processar arquivos recursivamente
function processFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processFiles(filePath);
    } else if (/\.(html|css|js)$/.test(file)) {
      console.log(`Processando: ${filePath}`);
      const content = fs.readFileSync(filePath, 'utf8');
      const newContent = replaceUrls(content);
      fs.writeFileSync(filePath, newContent);
    }
  });
}

// Diretório do projeto
const projectDir = process.argv[2] || '.';

// Executar
console.log('Iniciando substituição de URLs...');
processFiles(projectDir);
console.log('Processo concluído!');