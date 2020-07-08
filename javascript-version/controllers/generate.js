const fs = require('fs');

exports.app = (filesTree) => {
    const entries = Object.entries(filesTree);

    for (const [folder, files] of entries) {
        const filesEntries = Object.entries(files);
        for (const [file, content] of filesEntries) {
            fs.writeFileSync(`${folder}/${file}`, content, 'utf-8');
        }
    }
};