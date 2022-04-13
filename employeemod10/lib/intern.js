const Employee = require("./Employee");

// TODO: Write code to define and export the Intern class. 
class Intern extends Employee{
  constructor(name, id, email, school){
    super(name, id, email);

    this.school = school;
}
getSchool(){
  return this.school;
}
getRole(){
  return "Intern";
}
}

module.exports= Intern;