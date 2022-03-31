const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. 
class Manager extends Employee{
  constructor(name, id, email, officeNumber){
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getOfficeNumber(){
    return this.officeNumber;
  }
  getRole(){
    return "Manager";
  }
}

module.exports= Manager