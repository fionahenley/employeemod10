const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const allEmployees = [];

// function to write html
function writeToFile(fileName, data) {
  console.log(fileName, data);

  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

//function to ask if the employee list is complete 
//write's the file with the information
function anotherUser() {
  inquirer.prompt([{
    type: "list",
    name: "addAnother",
    choices: ["Add another employee", "Finish"]
  }]).then(addEmployee => {
    if (addEmployee.addAnother === "Add another employee") {
      promptUser();
    } else {
      writeToFile(outputPath, render(allEmployees));
    }
  });
}

//prompts employee questions
function promptUser() {
  return inquirer.prompt([{
    type: "input",
    name: "name",
    message: "What is your name?"
  }, {
    type: "input",
    name: "id",
    message: "What is your ID number?"
  }, {
    type: "input",
    name: "email",
    message: "What is your e-mail?"
  }, {
    type: "list",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"]
  }]).then(userInput => {
    switch (userInput.role) {
      case "Manager":
        addManager(userInput);
        break;

      case "Engineer":
        addEngineer(userInput);
        break;

      case "Intern":
        addIntern(userInput);
        break;
    }
  })

  //job specific questions
  //function for adding a manager
  function addManager(baseInput) {
    inquirer.prompt([{
      type: "input",
      name: "number",
      message: "What is your office number?"
    }]).then(answers => {
      //new variable with manager input
      const newManager = new Manager(baseInput.name, baseInput.id, baseInput.email, answers.number)
      allEmployees.push(newManager);
      anotherUser();
    });
  }

  //function for adding an intern
  function addIntern(baseInput) {
    inquirer.prompt([{
      type: "input",
      name: "school",
      message: "What school do you attend?"
    }]).then(answers => {
      //new variable with intern input
      const newIntern = new Intern(baseInput.name, baseInput.id, baseInput.email, answers.school)
      allEmployees.push(newIntern);
      anotherUser();
    });
  }

  //function for adding an engineer
  function addEngineer(baseInput) {
    inquirer.prompt([{
      type: "input",
      name: "github",
      message: "What is your github username?"
    }]).then(answers => {
      //new variable with engineer input
      const newEngineer = new Engineer(baseInput.name, baseInput.id, baseInput.email, answers.github)
      allEmployees.push(newEngineer);
      anotherUser();
    });
  }
}

//calling the function to prompt questions 
promptUser();

