const fs = require('fs');
const fsExtra = require('fs-extra');
const glob = require('glob');
const path = require('path');

// Create the 'extension' folder if it doesn't exist
const extensionFolder = path.join('out');
if (!fs.existsSync(extensionFolder)) {
  fs.mkdirSync(extensionFolder);
}

// Update HTML files in the 'extension' folder
const files = glob.sync('out/**/*.html');
files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const modifiedContent = content.replace(/\/_next/g, './next');

  // Write modified content to the 'extension' folder
  const newFilePath = path.join(extensionFolder, path.basename(file));
  fs.writeFileSync(newFilePath, modifiedContent, 'utf-8');
});

// Copy and remove the '_next' directory
const sourcePath = path.join('out', '_next');
const destinationPath = path.join(extensionFolder, 'next');

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
