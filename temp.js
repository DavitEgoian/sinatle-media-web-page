const fs = require('fs');

const replacement = \<script>
        function getUrlParameter(name) {
            try {
                let urlStr = window.location.href;
                let qsStr = urlStr.includes('?') ? urlStr.substring(urlStr.indexOf('?')) : window.location.search;
                let params = new URLSearchParams(qsStr);
                return params.get(name) || '';
            } catch(e) {
                return '';
            }
        }

        const title = getUrlParameter('title');
        const price = getUrlParameter('price');
        const desc = getUrlParameter('desc');
        const img = getUrlParameter('img');

        // Execute regardless of missing title, as elements might default to Georgian text
        if (title) document.getElementById('product-title').innerText = title;
        if (price) document.getElementById('product-price').innerText = price;
        if (desc) document.getElementById('product-desc').innerText = desc;
        
        if (img) {
            const isSubUrl = window.location.href.includes('/ge/') || window.location.href.includes('/en/');
            document.getElementById('product-img').src = img.startsWith('http') ? img : (isSubUrl ? '../' + img : img);
        }

        const tLower = (title || '').toLowerCase();
        const isApparel = tLower.includes('tee') || 
                          tLower.includes('hoodie') || 
                          tLower.includes('jacket') ||
                          tLower.includes('maisuri') ||
                          tLower.includes('hudi') ||
                          tLower.includes('kurtuk\\'i');
        
        if (!isApparel) {
            const sz = document.getElementById('size-selector');
            if (sz) sz.style.display = 'none';
        }

        // Cart Notification Logic\;

['ge/product.html', 'en/product.html', 'product.html'].forEach(f => {
   let content = fs.readFileSync(f, 'utf8');
   let startIdx = content.indexOf('<script>\\n        function getUrlParameter');
   
   // Handle different line endings safely
   if (startIdx === -1) {
      startIdx = content.indexOf('<script>\\r\\n        function getUrlParameter');
   }
   
   let endIdx = content.indexOf('// Cart Notification Logic');
   
   if (startIdx > -1 && endIdx > -1) {
       let newContent = content.substring(0, startIdx) + replacement + content.substring(endIdx + 26);
       fs.writeFileSync(f, newContent);
       console.log('Fixed', f);
   } else {
       console.log('Could not find start/end bounds for', f);
   }
});
