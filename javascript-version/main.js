const inquirer = require('inquirer');
const fs = require('fs');

const init = require('./controllers/init');
const build = require('./controllers/build.structure');

const CHOICES = fs.readdirSync('./templates');

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate? (simple-node-webapp)',
    default: 'simple-node-webapp.json',
    choices: CHOICES
  },

  {
    name: 'name',
    type: 'input',
    message: 'Project name:'
  },

  {
    name: 'version',
    type: 'input',
    default: '1.0.0',
    message: 'Version (1.0.0):'
  },

  {
    name: 'description',
    type: 'input',
    message: 'Project description:'
  },

  {
    name: 'author',
    type: 'input',
    message: 'Author:'
  },

  {
    name: 'license',
    type: 'input',
    default: 'MIT',
    message: 'License (MIT):'
  }
];

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const template = answers['template'];
    const name = answers['name'];
    const version = answers['version'];
    const description = answers['description'];
    const author = answers['author'];
    const license = answers['license'];

    const data = JSON.parse(fs.readFileSync(`templates/${template}`));

    // creating project directory
    console.log("[BUILD] Project folder");
    build.projectFolder(name)
    console.log("[*] Done");

    // cd in newly created project folder
    process.chdir(name);

    // updating packagejson with app details
    const packagejson = JSON.stringify(init.updateDefaultPackageJSON(data.packagejson, name, version, description, author, license));

    // creating packagejson
    console.log("[INIT] package.json");
    init.createPackageJSON(packagejson);
    console.log("[*] Done");

    // creating core files
    console.log("[BUILD] Core files...");
    build.coreFiles(data.entryPoint);
    console.log("[*] Done");

    // building folder structure
    console.log("[BUILD] Folder structure...");
    build.folderStructure(data.folders);
    console.log("[*] Done");

    // populating with readmes
    console.log("[BUILD] Populating folders with readmes...");
    build.populateWithReadmes(data.readmes);
    console.log("[*] Done");

});
