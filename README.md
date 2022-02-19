# Employee Tracker
![MIT license badge](https://img.shields.io/badge/license-MIT-blue)

## Description

Employee Tracker is a CLI Tool designed to help you manage your workforce.

## Table of Contents

[Installation](#installation)

[Usage](#usage)

[Contributing](#contributing)

[Tests](#tests)

[License](#license)

[Questions](#questions)

## Installation
First, clone this repo. You'll need to link your database by updating the information in **connection.js**, inside the **queries** folder. Then start the app by runnig the **index.js** file in the root directory.

## Usage
When the app starts you will be given a list of options. 
You can view, add, update or remove employees, roles, or departments, and can also track each department's budget.

A walkthrough video can be found [here](https://drive.google.com/file/d/1RU7mjpbSjFe3IK_px7ou5Rc3LS4msWuO/view).

## Contributing
This application uses 
[mysql2](https://www.npmjs.com/package/mysql2) to interact with the database and 
[inquirer](https://www.npmjs.com/package/inquirer) to handle the prompts.

## Tests
Unit tests are not provided for this application but the **db** folder contains SQL files to populate tables with dummy data for demonstration purposes. 

## License

### MIT License

Copyright 2022 Colin Bares

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Questions
You can check out my other projects on [GitHub](https://www.github.com/soundproofboot). Contact me for any further questions.
