const fs = require('fs');
const inquirer = require('inquirer');

const init = require('./controllers/init');
const build = require('./controllers/build');
const generate = require('./controllers/generate');

const CHOICES = fs.readdirSync('./templates');

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate? (simple-node-webapp)',
    default: 'simple-node-webapp-1.json',
    choices: CHOICES
  },

  {
    name: 'name',
    type: 'input',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name cannot be empty and may only include letters, numbers, underscores and hashes.';
    },
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

    try {
      build.projectFolder(name)
    } catch(e) {
      console.log(e);
      console.log("[ABORT] Failure, project not created.")
      process.exit(1);
    }

    console.log("[*] Done");

    // cd in newly created project folder
    process.chdir(name);

    // updating packagejson with app details
    const packagejson = JSON.stringify(init.updateDefaultPackageJSON(data.packagejson, name, version, description, author, license));

    // creating packagejson
    console.log("[INIT] package.json");
    init.createPackageJSON(packagejson);
    console.log("[*] Done");

    // installing dependencies
    console.log("[INIT] Dependencies from package.json");
    init.npmInstall();
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

    // populating with readmes
    console.log("[GENERATE] Sample app...");
    generate.app(data.appFiles);
    console.log("[*] Done");

    console.log("[SUCCESS] Project created!");
});
