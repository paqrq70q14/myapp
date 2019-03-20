var db = require('../mongo/dbb');

function Employee(employee){
    this.id = employee.id;
    this.username = employee.username;
    this.password = employee.password;

}


Employee.getUserByName = function (username, callback){

    db.queryUser(username, function(err, result){
        console.log(username); //ls

      if (!result){
         return callback(err);
      }
     
      var queryResult = result;
       console.log(queryResult);
      return callback(queryResult);
    })
}


// Employee.getUserByName("ls", function (result){
//     if(!result) {
//         console.log("no");
//     }
//     console.log(result.age);
  
    
// })


module.exports = Employee;