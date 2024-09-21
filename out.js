const fs = require('fs');
const fsExtra = require('fs-extra');
const glob = require('glob');
const path = require('path');

const files = glob.sync('out/**/*.html');
files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const modifiedContent = content.replace(/\/_next/g, './next');
  fs.writeFileSync(file, modifiedContent, 'utf-8');
});

const sourcePath = path.join('out', '_next');
const destinationPath = path.join('out', 'next');

fsExtra.copy(sourcePath, destinationPath, (err) => {
  if (err) {
    console.error('Failed to copy "_next" directory to "next".', err);
  } else {
    console.log('Copied "_next" directory to "next" successfully.');
    fsExtra.remove(sourcePath, (err) => {
      if (err) {
        console.error('Failed to remove original "_next" directory.', err);
      } else {
        console.log('Removed original "_next" directory successfully.');
      }
    });
  }
});