const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- Media Logos -->\s*<section.*?<\/section>/s;
const match = html.match(regex);

if (match) {
  let sectionHtml = match[0];
  
  // Make the section exactly like the screenshot:
  // black background, white text
  sectionHtml = sectionHtml.replace(/<section class="[^"]*"/, '<section class="bg-black text-white p-6 md:p-12 lg:p-16 border-b-[6px] md:border-b-[10px] border-black flex flex-col items-center justify-center w-full"');
  
  // Style the heading
  sectionHtml = sectionHtml.replace(/<h1 class="[^"]*"/, '<h1 class="text-[30px] sm:text-[40px] mb-10 font-bold leading-none w-full max-w-[880px] uppercase font-display tracking-widest text-left"');
  
  // Style the grid wrapper
  // 9 items * 76px = 684px plus gap. Using max-w-[880px] for up to 9 cols depending on gap.
  // The screenshot shows 9 columns, so we can use a grid if needed, or flex wrapped.
  // Let's use grid-template-columns with gap-4 and let it flow. The gap looks quite generous, maybe gap-8 (32px).
  // 9 * 76 + 8 * 24 = 684 + 192 = 876px
  sectionHtml = sectionHtml.replace(/<div class="grid[^"]*"/, '<div class="w-full max-w-[880px] flex flex-wrap gap-[24px] justify-start"');

  // Ensure all anchor tags have fixed 76x76 dimensions
  sectionHtml = sectionHtml.replace(/class="flex flex-col items-center justify-center relative[^"]*"/g, 'class="flex items-center justify-center relative w-[76px] h-[76px] bg-white transition-transform hover:scale-105 overflow-hidden"');
  
  // Clean up image classes to just take 100% of the 76x76 anchor, maintaining aspect ratio but fitting within the square as displayed
  sectionHtml = sectionHtml.replace(/class="w-full h-auto sm:w-19 sm:h-19[^"]*"/g, 'class="w-full h-full object-contain p-1"');
  
  // Remove height formatting styles on div inside logos section
  sectionHtml = sectionHtml.replace(/style="height:100%;width:100%"/g, '');
  sectionHtml = sectionHtml.replace(/h-\[85px\]/g, '');

  html = html.replace(regex, sectionHtml);
  fs.writeFileSync('index.html', html);
  console.log('Modified successfully.');
} else {
  console.log('Could not find Media Logos section.');
}
