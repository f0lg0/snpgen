const fs = require('fs');
const child_process = require('child_process');

exports.app = (filesTree) => {
    const entries = Object.entries(filesTree);

    for (const [folder, files] of entries) {
        const filesEntries = Object.entries(files);
        for (const [file, content] of filesEntries) {
            fs.writeFileSync(`${folder}/${file}`, content, 'utf-8');
        }
    }
};

exports.vueApp = () => {
    child_process.execSync('vue create client', {
        stdio: [0, 1, 2]
    });
};