let db = require('../mongo/dbb');

function Employee(employee){
    this.id = employee.id;
    this.username = employee.username;
    this.password = employee.password;

}


Employee.getUserByName = function (username, callback){

    db.queryUser(username, function(err, result){
        
      if (!result){
         return callback(err);
      }
     
      let queryResult = result;
       console.log(queryResult);
       return callback(queryResult);
    })
}




module.exports = Employee;