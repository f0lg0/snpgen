const fs = require('fs');

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