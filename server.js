const express = require('express');
const fs = require('fs');
var app = express();
app.use(express.json());
// var users=[
//     {id:0, name:"janak", email:"janak@gmail.com"},
//     {id:1, name:"ayush", email:"ayush@gmail.com"},
//     {id:2, name:"divyesh", email:"divyesh@gmail.com"}
// ];
app.use('/', express.static('public'));


app.get('/api/users', (req, res) => {
    fs.readFile("users.json", function (err, data) {

        // Check for errors 
        if (err) throw err;

        // Converting to JSON 
        const users = JSON.parse(data);

        res.send(users);
    });

});


//-------------------------------------------http GET-------------------------------------------------------------

app.get('/api/users/:id', (req, res) => {
    fs.readFile("users.json", function (err, data) {

        // Check for errors 
        if (err) throw err;

        // Converting to JSON 
        const users = JSON.parse(data);


        const user = users.users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).send('the user was not found');
        }
        res.status(200).send(user);
    });
});

// //-----------------------------------------http POST---------------------------------------------------------------

app.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).send('Name or Email cannot be null');
    }

    fs.readFile("users.json", function (err, data) {

        // Check for errors 
        if (err) throw err;

        // Converting to JSON 
        const users = JSON.parse(data);
        const user = {
            id: users.users.length,
            name: req.body.name,
            email: req.body.email
        };
        users.users.push(user);

        fs.writeFile("users.json", JSON.stringify(users), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success 
        });
        res.status(200).send(user);
    });


});


// //------------------------------------------http PUT-----------------------------------------------------------------

app.put('/api/users/:id', (req, res) => {
    if(req.params.id==0){
        return res.status(400).send('Access restrictes to id = 0');
    }

    fs.readFile("users.json", function (err, data) {

        // Check for errors 
        if (err) throw err;

        // Converting to JSON 
        const users = JSON.parse(data);
        if (!users.users[parseInt(req.params.id)]) {
            return res.status(404).send('the user was not found');
        }
        if (!req.body.name || !req.body.email) {
            return res.status(400).send('Name or Email cannot be null');
        }

        users.users[parseInt(req.params.id)].name = req.body.name;
        users.users[parseInt(req.params.id)].email = req.body.email;
        fs.writeFile("users.json", JSON.stringify(users), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success 
        });
        res.status(200).send(users.users[parseInt(req.params.id)]);
    });
});


//----------------------------------------http DELETE-----------------------------------------------------------------
app.delete('/api/users/:id', (req, res) => {
    if(req.params.id==0){
        return res.status(400).send('Access restrictes to id = 0');
    }
    fs.readFile("users.json", function (err, data) {

        // Check for errors 
        if (err) throw err;

        // Converting to JSON 
        const users = JSON.parse(data);
        if (!users.users[parseInt(req.params.id)]) {
            return res.status(404).send('the user was not found');
        }
        const user = users.users.find(u => u.id === parseInt(req.params.id));
        const index = users.users.indexOf(users.users[parseInt(req.body.param)]);
        users.users.splice(index, 1);
        fs.writeFile("users.json", JSON.stringify(users), err => {

            // Checking for errors 
            if (err) throw err;

            console.log("Done writing"); // Success 
        });
        res.status(200).send(user);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => { console.log('SERVER  is running on PORT 3000 ...') });