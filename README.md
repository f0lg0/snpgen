# snpgen

A Simple Node Project Generator based on my [node-webapp-template](https://github.com/f0lg0/node-webapp-template) for beginners.

## Description

This is an offline project generator that let's you create NodeJS projects by simply running a command. This is useful especially when you don't have the possibility to clone my [template](https://github.com/f0lg0/node-webapp-template). It is also **customizable** so you can build your own template and generate your own project.

### Note

This tool is more of a utility I needed, it is **NOT** professional or really well curated. I wanted to share it because maybe it can help others too. Initially this was written in Python but I've tried to write it also in Javascript.

### How it works 

spngen is really simple: it grabs a project structure from the templates folder (in the Python version it grabs it from template.py) which is a JSON file with all the project details and proceeds to install the newly grabbed payload by iterating thru it. Obviously the contents are hard-coded inside the template file but that's because this is an offline generator. The templates **must** follow this schema:

```json
{
    "packagejson" : {
        "main": "server.js",
        "scripts": {
            "start": "node server.js",
            "dev": "nodemon server.js"
        },
        "dependencies": {
            "cookie-parser": "^1.4.5",
            "dotenv": "^8.2.0",
            "ejs": "^3.1.3",
            "express": "^4.17.1",
            "helmet": "^3.23.3",
            "jsonwebtoken": "^8.5.1",
            "mongoose": "^5.9.21",
            "morgan": "^1.10.0"
        },
        "devDependencies": {
            "nodemon": "^2.0.4"
        }
    },
    
    "entryPoint" : {
        "server.js" : "ONE-LINER CONTENT HERE"
    },

    "folders" : {
        "api" : null, 
        "config" : null,
        "controllers" : null, 
        "middlewares" : null, 
        "models" : null, 
        "public" : ["css", "images", "javascript"], 
        "routes" : null, 
        "views" : null, 
        "wireframes" : null
    },

    "readmes" : {
        "api" : "ONE-LINER CONTENT HERE",
        "config" :  "ONE-LINER CONTENT HERE",
        "controllers" :  "ONE-LINER CONTENT HERE",
        "middlewares" :  "ONE-LINER CONTENT HERE",
        "models" :  "ONE-LINER CONTENT HERE",
        "public" :  "ONE-LINER CONTENT HERE",
        "routes" : "ONE-LINER CONTENT HERE",
        "views" :  "ONE-LINER CONTENT HERE",
        "wireframes" :  "ONE-LINER CONTENT HERE"
    },

    "appFiles" : {
        "api" : {"date.js" :  "ONE-LINER CONTENT HERE"},
        "controllers" : {
            "date.js" :  "ONE-LINER CONTENT HERE",
            "index.js" :  "ONE-LINER CONTENT HERE"
        },

        "public" : {
            "404.html" :  "ONE-LINER CONTENT HERE",
            "index.html" :  "ONE-LINER CONTENT HERE"
        },

        "public/css" : {
            "styles.css" :  "ONE-LINER CONTENT HERE"
        },

        "routes" : {
            "api.js" :  "ONE-LINER CONTENT HERE",
            "date.js" :  "ONE-LINER CONTENT HERE",
            "index.js" : "ONE-LINER CONTENT HERE"
        },

        "views" : {
            "date.ejs" :  "ONE-LINER CONTENT HERE"
        }

    }

}
```

The files content must be 'one-liner'. In the folders section you assign null if the folder doesn't have subfolders, if it does you define an array with those subfolders.

Currently you are limited with this setup: a folder and some subfolders. Subfolders can't have subfolders.

### Run

PYTHON VERSION

```
python3 generate.py
```

Just run this file and you will be go to go, it even installs all the depndencies from the package.json file.

The project template is taken from the template file, there you will find all the files and their relative content.

Have fun with it and customize it as you like! If you tweak it, it can be used to generate other projects too!



JAVASCRIPT VERSION

```
npm install .
```

```
npm run snpgen
```

### Note

The files are one-line pieces of code, you may want to beautify them.