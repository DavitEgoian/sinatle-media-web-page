const fs = require('fs');

const translateJs = fs.readFileSync('translate.js', 'utf8');
const translationsMatch = translateJs.match(/const translations = (\{[\s\S]*?\});/);
let translations = {};
if (translationsMatch) {
  translations = eval('(' + translationsMatch[1] + ')');
}

function adjustPaths(html) {
  let out = html.replace(/(href|src)="(?!\.\.\/)(img\/[^"]*)"/g, '$1="../$2"');
  out = out.replace(/href="styles\.css"/, 'href="styles.css"');
  out = out.replace(/src="script\.js"/, 'src="script.js"');
  return out;
}

function translateHtml(html) {
  let out = html;
  const keys = Object.keys(translations).sort((a,b) => b.length - a.length);
  for (let key of keys) {
      if (key === 'X' || key === '/mo' || key === 'About' || key === 'Join' || key === 'Contact' || key === 'Terms') { // small keys to avoid generic destruction
         const regex = new RegExp(`>\\s*${key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*<`, 'g');
         out = out.replace(regex, `>${translations[key]}<`);
         continue;
      }
      const safeKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(safeKey, 'g');
      out = out.replace(regex, translations[key]);
  }
  return out;
}

function makeEn(html) {
  let out = adjustPaths(html);
  
  out = out.replace(/<button([^>]*)class="([^"]*)lang-toggle-btn([^"]*)"([^>]*)>([\s\S]*?)<\/button>/g, (match, p1, p2, p3, p4, p5) => {
      let rest = p4.replace(/title="[^"]*"/, '');
      return `<a${p1}class="${p2}lang-toggle-btn${p3}" title="Switch to Georgian" href="../ge/index.html"${rest}>${p5}</a>`;
  });
  
  out = out.replace(/<script src="(?:\.\.\/)?translate\.js" defer><\/script>/g, '');
  
  return out;
}

function makeGe(html) {
  let out = adjustPaths(html);
  out = translateHtml(out);
  // Removed out = out.replace(/<body class="/g, '<body class="lang-ge '); since ge styles uses normal body tags without the lang-ge selector
  
  out = out.replace(/<button([^>]*)class="([^"]*)lang-toggle-btn([^"]*)"([^>]*)>([\s\S]*?)<\/button>/g, (match, p1, p2, p3, p4, p5) => {
      let rest = p4.replace(/title="[^"]*"/, '');
      return `<a${p1}class="${p2}lang-toggle-btn${p3}" title="Switch to English" href="../en/index.html"${rest}>${p5}</a>`;
  });
    
  out = out.replace(/src="https:\/\/flagcdn\.com\/ge\.svg"/g, 'src="https://flagcdn.com/us.svg"');
  out = out.replace(/alt="Georgian Flag"/g, 'alt="US Flag"');
  
  out = out.replace(/src="(?:\.\.\/)?img\/S-logo\.png"/g, 'src="../img/6-S-Geo-logo-white.png" style="filter: invert(1);"');
  out = out.replace(/href="(?:\.\.\/)?img\/S-logo[-a-zA-Z0-9]*\.png"/g, 'href="../img/6-S-Geo-logo-white.png"');
  out = out.replace(/<script src="(?:\.\.\/)?translate\.js" defer><\/script>/g, '');
  
  return out;
}

if (!fs.existsSync('en')) fs.mkdirSync('en');
if (!fs.existsSync('ge')) fs.mkdirSync('ge');

let script = fs.existsSync('script.js') ? fs.readFileSync('script.js', 'utf8') : '';
if (script) {
    fs.writeFileSync('en/script.js', script);
    fs.writeFileSync('ge/script.js', script);
}

let styles = fs.readFileSync('styles.css', 'utf8');
let enStyles = styles.replace(/url\(['"]?(font\/|img\/)([^'"]+)['"]?\)/g, "url('../$1$2')");
fs.writeFileSync('en/styles.css', enStyles);

let geStyles = enStyles.replace(/body\.lang-ge /g, 'body ');
geStyles = geStyles.replace(/body\.lang-ge/g, 'body');
fs.writeFileSync('ge/styles.css', geStyles);

['_index.html', 'product.html'].forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  let baseName = file === '_index.html' ? 'index.html' : file;
  let modifiedHref = file === '_index.html' ? 'index.html' : 'product.html';

  fs.writeFileSync('en/' + baseName, makeEn(original));
  
  let geContent = makeGe(original).replace(/href="\.\.\/en\/index\.html"/g, `href="../en/${modifiedHref}"`);
  let enContent = makeEn(original).replace(/href="\.\.\/ge\/index\.html"/g, `href="../ge/${modifiedHref}"`);
  
  fs.writeFileSync('ge/' + baseName, geContent);
  fs.writeFileSync('en/' + baseName, enContent);
});

// Create redirect at root
fs.writeFileSync('index.html', '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; URL=ge/index.html" /></head><body></body></html>');

console.log('Done building ge/ and en/');