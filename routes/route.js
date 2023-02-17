//custom route for fetching data  
var transactions = require('../data_access/transaction');  
  
module.exports = {  
    //set up route configuration that will be handle by express server  
    configure: function (app) {  
  

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
        // adding route for users, here app is express instance which provide use  
        // get method for handling get request from http server.   
        app.get('/api/users', function (req, res) {  
            transactions.getAllUsers(res).then(function(result){
               // console.log(result);
            });  
        });  

        app.get('/api/users/:id/', function (req, res) {  
            transactions.getUserById(req.params.id,res);  
        }); 

        app.get('/api/users/delete/:id/', function (req, res) {  
            transactions.deleteUserById(req.params.id,res);  
        }); 
  
        // here we gets id from request and passing to it transaction method.  
        app.get('/api/transactions/:id/', function (req, res) {  
            transactions.getTransactionById(req.params.id, res);  
        });  

        app.get('/api/transactions', function (res) {  
            transactions.getAllTransactions(res).then(function(){

            });  
        });  

        app.get('/api/data', function (req, res) {  
            transactions.getRealData(res);  
            //console.log(res);
        });
  
    }  
};  