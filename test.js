const fs = require('fs');
fs.readFile("users.json", function (err, data) {

    // Check for errors 
    if (err) throw err;

    // Converting to JSON 
    const users = JSON.parse(data);
    console.log(users.users[0]);
});