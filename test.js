const fs = require('fs');
fs.readFile("users.json", function (err, data) {

    // Check for errors 
    if (err) throw err;

    // Converting to JSON 
    const users = JSON.parse(data);
    console.log(users.users[0]);
    // var res = []; 

    //         for(var i in users) 
    //             res.push(users[i]);
    //     console.log(res);
});