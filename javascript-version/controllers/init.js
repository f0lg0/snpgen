const fs = require('fs');
const child_process = require('child_process');

exports.updateDefaultPackageJSON = (packagejson, name, version, description, author, license) => {
    packagejson['name'] = name;
    packagejson['version'] = version;
    packagejson['description'] = description;
    packagejson['author'] = author;
    packagejson['license'] = license;
  
    return packagejson;
};

exports.createPackageJSON = (packagejson) => {
    fs.writeFileSync(`package.json`, packagejson, 'utf-8');
};

// to avoid requiring the whole npm package from node_modules I preferred to make a system call
//  source: https://stackoverflow.com/questions/15957529/can-i-install-a-npm-package-from-javascript-running-in-node-js

/*
    quote:
    Also, beware-- npm has lots of dependencies, so adding it to your module will most likely result in it taking MUCH longer to download. 
    Check out one of the child_process answers to leverage the global npm already installed on your users' machines. 
*/
exports.npmInstall = () => {
    child_process.execSync('npm install .',{stdio:[0,1,2]});
};