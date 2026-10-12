const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/LENOVO/.gemini/antigravity/brain/adb40396-fc15-45fd-8766-cde0035e1500';
const files = fs.readdirSync(brainDir);

const mapping = [
  // Corporate Blazers & Shirts
  { prefix: 'wm_prod_corp_01', dest: 'public/products/women/corp/corp-prod-1.jpg' },
  { prefix: 'wm_prod_corp_02', dest: 'public/products/women/corp/corp-prod-2.jpg' },
  { prefix: 'wm_prod_corp_03', dest: 'public/products/women/corp/corp-prod-3.jpg' },
  { prefix: 'wm_prod_corp_04', dest: 'public/products/women/corp/corp-prod-4.jpg' },
  { prefix: 'wm_prod_corp_05', dest: 'public/products/women/corp/corp-prod-5.jpg' },

  // Hospitality & Front-Office
  { prefix: 'wm_prod_hosp_01', dest: 'public/products/women/hosp/hosp-prod-1.jpg' },
  { prefix: 'wm_prod_hosp_02', dest: 'public/products/women/hosp/hosp-prod-2.jpg' },
  { prefix: 'wm_prod_hosp_03', dest: 'public/products/women/hosp/hosp-prod-3.jpg' },
  { prefix: 'wm_prod_hosp_04', dest: 'public/products/women/hosp/hosp-prod-4.jpg' },
  { prefix: 'wm_prod_hosp_05', dest: 'public/products/women/hosp/hosp-prod-5.jpg' },

  // Women's Scrub Sets
  { prefix: 'wm_prod_scrubs_01', dest: 'public/products/women/scrubs/scrubs-prod-1.jpg' },
  { prefix: 'wm_prod_scrubs_02', dest: 'public/products/women/scrubs/scrubs-prod-2.jpg' },
  { prefix: 'wm_prod_scrubs_03', dest: 'public/products/women/scrubs/scrubs-prod-3.jpg' },
  { prefix: 'wm_prod_scrubs_04', dest: 'public/products/women/scrubs/scrubs-prod-4.jpg' },
  { prefix: 'wm_prod_scrubs_05', dest: 'public/products/women/scrubs/scrubs-prod-5.jpg' },

  // Education & Faculty Wear
  { prefix: 'wm_prod_edu_01', dest: 'public/products/women/edu/edu-prod-1.jpg' },
  { prefix: 'wm_prod_edu_02', dest: 'public/products/women/edu/edu-prod-2.jpg' },
  { prefix: 'wm_prod_edu_03', dest: 'public/products/women/edu/edu-prod-3.jpg' },
  { prefix: 'wm_prod_edu_04', dest: 'public/products/women/edu/edu-prod-4.jpg' },
  { prefix: 'wm_prod_edu_05', dest: 'public/products/women/edu/edu-prod-5.jpg' },

  // Industrial & Lab Coats
  { prefix: 'wm_prod_ind_01', dest: 'public/products/women/ind/ind-prod-1.jpg' },
  { prefix: 'wm_prod_ind_02', dest: 'public/products/women/ind/ind-prod-2.jpg' },
  { prefix: 'wm_prod_ind_03', dest: 'public/products/women/ind/ind-prod-3.jpg' },
  { prefix: 'wm_prod_ind_04', dest: 'public/products/women/ind/ind-prod-4.jpg' },
  { prefix: 'wm_prod_ind_05', dest: 'public/products/women/ind/ind-prod-5.jpg' },

  // Plus Size Range
  { prefix: 'wm_prod_plus_01', dest: 'public/products/women/plussize/plus-prod-1.jpg' },
  { prefix: 'wm_prod_plus_02', dest: 'public/products/women/plussize/plus-prod-2.jpg' },
  { prefix: 'wm_prod_plus_03', dest: 'public/products/women/plussize/plus-prod-3.jpg' },
  { prefix: 'wm_prod_plus_04', dest: 'public/products/women/plussize/plus-prod-4.jpg' },
  { prefix: 'wm_prod_plus_05', dest: 'public/products/women/plussize/plus-prod-5.jpg' },
];

let copied = 0;
for (const item of mapping) {
  const matched = files.filter(f => f.startsWith(item.prefix) && f.endsWith('.jpg'));
  if (matched.length > 0) {
    matched.sort();
    const latestFile = matched[matched.length - 1];
    const srcPath = path.join(brainDir, latestFile);
    const destDir = path.dirname(item.dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(srcPath, item.dest);
    copied++;
    console.log(`Copied ${latestFile} -> ${item.dest}`);
  } else {
    console.warn(`WARNING: Could not find file for prefix ${item.prefix}`);
  }
}
console.log(`Finished: Copied ${copied} of ${mapping.length} images.`);
