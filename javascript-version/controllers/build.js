const fs = require('fs');

exports.projectFolder = (projectName) => {
    fs.mkdirSync(projectName);
};

exports.coreFiles = (entryPoint) => {
    const entries = Object.entries(entryPoint);

    for (const [file, content] of entries) {
      fs.writeFileSync(file, content, 'utf-8');
    }
};

exports.folderStructure = (folders) => {
    const entries = Object.entries(folders);

    for (const [folder, subfolders] of entries) {
      fs.mkdirSync(folder);
      if (subfolders) {
        for (const subfolder of subfolders) {
          fs.mkdirSync(`${folder}/${subfolder}`);
        }
      }
    }
};

exports.populateWithReadmes = (readmes) => {
    const entries = Object.entries(readmes);

    for (const [folder, readme] of entries) {
      fs.writeFileSync(`${folder}/readme.md`, readme, 'utf-8');
    }
}