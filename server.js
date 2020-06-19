const express = require('express');
const bp = require('body-parser');
var app =express();
app.use(express.json());
var users=[
    {id:0, name:"janak", email:"janak@gmail.com"},
    {id:1, name:"ayush", email:"ayush@gmail.com"},
    {id:2, name:"divyesh", email:"divyesh@gmail.com"}
];
app.use('/',express.static('public'));


app.get('/api/users',(req, res)=>{
res.send(users);
});


//-------------------------------------------http GET-------------------------------------------------------------

app.get('/api/users/:id',(req, res)=>{
const user = users.find(u => u.id === parseInt(req.params.id));
if(!user){
    res.status(404).send('the user was not found');
}else{
    res.status(200).send(user);
}
});


//-----------------------------------------http POST---------------------------------------------------------------

app.post('/api/users',(req,res)=>{
    if(!req.body.name || !req.body.email){
        res.status(400).send('Name or Email cannot be null');
        return;
    }
    const user = {
    id:users.length,
    name: req.body.name,
    email: req.body.email
};
users.push(user);
res.status(200).send(user);
});


//------------------------------------------http PUT-----------------------------------------------------------------

app.put('/api/users/:id', (req,res)=>{
    const user = users.find(u => u.id === parseInt(req.params.id));
if(!user){
    res.status(404).send('the user was not found');
}else{
    if(!req.body.name || !req.body.email){
        res.status(400).send('Name or Email cannot be null');
        return;
    }
    user.name=req.body.name;
    user.email=req.body.email;
    res.status(200).send(user);
}
});


//----------------------------------------http DELETE-----------------------------------------------------------------
app.delete('/api/users/:id',(req,res)=>{
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user){
        res.status(404).send('the user was not found');
    }
        const index=users.indexOf(user);
        users.splice(index,1);
        res.status(200).send(user);
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log('SERVER  is running on PORT 3000 ...')});