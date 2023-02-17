//methods for fetching mysql data  
var connection = require('../connection/MySQLConnect');  
  
function Transaction() {  
  
  

    this.getUserById = function (id,res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT DISTINCT * FROM users WHERE UserID='+id+'', function (err, result) {  
                con.release();  
                res.send(result);  
            });  
        });  
    };  

  // get all users data   
    this.getAllUsers = function (res) {  
        
        //promise declaration
        var promise = new Promise( function(resolve, reject) {

            // initialize database connection  
            connection.init();  
            // calling acquire methods and passing callback method that will be execute query  
            // return response to server   
            connection.acquire(function (err, con) {  
                con.query('SELECT DISTINCT * FROM users', function (err, result) {  
                    if(err || result.length === 0){
                        con.release();  
                        reject();
                    }else{
                        con.release();  
                        //res.send(result);  
                        resolve(result);
                    }
                });  
            });

        });
        return promise;
    };

      // get all users data   
      this.getAllTransactions = function (res) {  
        
        //promise declaration
        var promise = new Promise( function(resolve, reject) {

            // initialize database connection  
            connection.init();  
            // calling acquire methods and passing callback method that will be execute query  
            // return response to server   
            connection.acquire(function (err, con) {  
                con.query('SELECT DISTINCT * FROM transactions', function (err, result) {  
                    if(err || result.length === 0){
                        con.release();  
                        reject();
                    }else{
                        con.release();  
                        //res.send(result);  
                        resolve(result);
                    }
                });  
            });

        });
        return promise;
    };


    this.getStatesData = function (res) {  
        
        //promise declaration
        var promise = new Promise( function(resolve, reject) {

            // initialize database connection  
            connection.init();  
            // calling acquire methods and passing callback method that will be execute query  
            // return response to server   
            connection.acquire(function (err, con) {  
                con.query('SELECT * FROM state', function (err, result) {  
                    if(err || result.length === 0){
                        con.release();  
                        reject();
                    }else{
                        con.release();  
                        //res.send(result);  
                        resolve(result);
                    }
                });  
            });

        });
        return promise;
    };

    this.getDistrictsData = function (res) {  
        
        //promise declaration
        var promise = new Promise( function(resolve, reject) {

            // initialize database connection  
            connection.init();  
            // calling acquire methods and passing callback method that will be execute query  
            // return response to server   
            connection.acquire(function (err, con) {  
                con.query('SELECT * FROM district', function (err, result) {  
                    if(err || result.length === 0){
                        con.release();  
                        reject();
                    }else{
                        con.release();  
                        //res.send(result);  
                        resolve(result);
                    }
                });  
            });

        });
        return promise;
    };

    this.getHealthData = function (res) {  
        
        //promise declaration
        var promise = new Promise( function(resolve, reject) {

            // initialize database connection  
            connection.init();  
            // calling acquire methods and passing callback method that will be execute query  
            // return response to server   
            connection.acquire(function (err, con) {  
                con.query('SELECT * FROM count', function (err, result) {  
                    if(err || result.length === 0){
                        con.release();  
                        reject();
                    }else{
                        con.release();  
                        //res.send(result);  
                        resolve(result);
                    }
                });  
            });

        });
        return promise;
    };


    this.getRealData = async function(res){

        var data = [];        

        var districtData = [];

        var state_districts_info = { };

        var stateAPIdata = await this.getStatesData();
        var districtAPIdata = await this.getDistrictsData();
        var healthAPIdata  =  await this.getHealthData();

        stateAPIdata.forEach(stateelement => {
            state_districts_info["state"] = stateelement["NAME"];
            state_districts_info["statecode"] = stateelement["CODE"];
            state_districts_info["districtData"] = [];

            districtAPIdata.forEach(districtelement =>{
                if(stateelement["ID"] == districtelement["STATE_ID"]){

                    healthAPIdata.forEach((healthelement)=>{
                        var districtDetails = {};
                        districtDetails["district"] = districtelement["NAME"];
                        if(healthelement["DIST_ID"] == districtelement["ID"]){
                            districtDetails["notes"] = healthelement["notes"];
                            districtDetails["active"] = healthelement["active"];
                            districtDetails["confirmed"] = healthelement["confirmed"];
                            districtDetails["deceased"] = healthelement["deceased"];
                            districtDetails["recovered"] = healthelement["recovered"];
                            districtDetails["delta"] = {
                                "confirmed":0,
                                "deceased" : 0,
                                "recovered":0
                            }
                            state_districts_info["districtData"].push(districtDetails);
                        }
                    });
                }




            });

            data.push(state_districts_info);
            state_districts_info = {};


        });

        // stateAPIdata.forEach(stateelement => {
        //     districtAPIdata.forEach(districtelement => {
        //         if(stateelement["ID"] == districtelement["STATE_ID"]){
        //             state_districts_info["state"] = stateelement["NAME"];
        //             state_districts_info["statecode"] = stateelement["CODE"];
        //         }
        //     });
            
        //     state_districts_info = {};
        // });

        // stateAPIdata.forEach(stateelement => {
        //     districtAPIdata.forEach(districtelement => {
        //                 if(stateelement["ID"] == districtelement["STATE_ID"]){
        //                         state_districts_info[stateelement["NAME"]] = {};
        //                         state_districts_info[stateelement["NAME"]]["districtData"] = {};
        //                         state_districts_info[stateelement["NAME"]]["statecode"] = stateelement["CODE"];
        //                         state_districts_info[stateelement["NAME"]]["state"] = stateelement["NAME"];
                                
        //                 }
        //         });
        // });

        // stateAPIdata.forEach(stateelement => {
        // districtAPIdata.forEach((districtelement)=>{
        //     healthAPIdata.forEach((healthlement)=>{
        //         if(stateelement["ID"] == districtelement["STATE_ID"]){
        //             if(districtelement["ID"] == healthlement["DIST_ID"]){
        //                 state_districts_info[stateelement["NAME"]]["districtData"][districtelement["NAME"]] = {};
        //                 state_districts_info[stateelement["NAME"]]["districtData"][districtelement["NAME"]]["notes"]= healthlement.notes;
        //                 state_districts_info[stateelement["NAME"]]["districtData"][districtelement["NAME"]]["active"]= healthlement.active;
        //                 state_districts_info[stateelement["NAME"]]["districtData"][districtelement["NAME"]]["confirmed"]= healthlement.confirmed;
        //                 state_districts_info[stateelement["NAME"]]["districtData"][districtelement["NAME"]]["deceased"]= healthlement.deceased;
        //                 state_districts_info[stateelement["NAME"]]["districtData"][districtelement["NAME"]]["recovered"]= healthlement.recovered;
        //                 state_districts_info[stateelement["NAME"]]["districtData"][districtelement["NAME"]]["delta"]= {};
        //             }
        //         }
        //     });
        // });
        // });
                                    
        res.send(data);

    //     if(userelement["UserID"] == txelement.UserId ){
    //         demo.users[userelement["UserID"]] = userelement;
    //         demo.users[userelement["UserID"]]["transactions"] = txelement;
    // }

    };



    this.getData = async function(res){

        var demo = {
            "users":{
            }
        };

        var tempusers = await this.getAllUsers();
        var temptransactions = await this.getAllTransactions(); 

        tempusers.forEach(userelement => {
            temptransactions.forEach(txelement => {
            
                if(userelement["UserID"] == txelement.UserId ){
                        demo.users[userelement["UserID"]] = userelement;
                        demo.users[userelement["UserID"]]["transactions"] = txelement;
                }
            
            });
        });

        res.send(demo);
        // this.getAllUsers().then(function(res1){
        //     demo.users = res1;
        //     //res.send(demo);
        //     this.getAllTransactions().then(function(res2){
        //         demo.transactions = res2;
        //         res.send(demo);
        //     });
        // });

    };




    this.deleteUserById = function (id,res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            var query = 'DELETE FROM `users` WHERE UserID='+id+'';
            con.query(query, function (err, result) {  
                con.release();  
                res.send(result);  
            });  
        });  
    };  
    

  
    this.getTransactionById = function (id, res) {  
        // initialize database connection  
        connection.init();  
        // get id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'SELECT date_format(t.TransactionDate,\'%d-%b-%Y\') as date, ' +  
                'CASE WHEN t.TransactionAmount >= 0 THEN t.TransactionAmount ' +  
                'ELSE 0 END AS Credit, CASE WHEN t.TransactionAmount < 0 THEN ' +  
                't.TransactionAmount ELSE 0 END AS Debit, t.Balance FROM ' +  
                'transactions t INNER JOIN users u ON t.UserId=u.UserID WHERE t.UserId = ?;';  
            con.query(query, id, function (err, result) {  
                    con.release();  
                    res.send(result);  
                });  
        });  
    };  
    


}  
  
module.exports = new Transaction();  