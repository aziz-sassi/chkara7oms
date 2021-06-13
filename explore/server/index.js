const express = require('express');
const db = require('./db');
const app = express();
const port = 1337;
const path = require ('path');
var bodyParser = require('body-parser')


app.use(express.static(path.join(__dirname, '..','client', 'build')));
app.use(bodyParser.json())




app.get("/getusers",(req,res)=>{
  db.fetchData(function (err,result) {
  err ? console.error(err) :  res.status(201).json(result)
  })
})

app.post('/loginForm',(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  db.getandcompare([username, password],(err,result)=>{
  if (err) {
    console.error(err)
  }
  else if (result[0]===undefined) {
    console.log('cant login')
    res.status(200).json("notLogged")
  }
  else if (username===result[0].username && password===result[0].password) {
    console.log('matching')
    res.status(200).json("Match")
  }
  })
});

app.post('/createAccount',(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  var about = req.body.about;
  db.getandcompare([username, password],(err,result)=>{
    if (err) {
      console.error(err)
    }
    else if (result[0]===undefined) {
  db.createAccount([username, password,about],(err,result)=>{
    if (err) {
      console.error(err)
    }
    res.status(200).send("new created");
  })
    }
    else if (username===result[0].username && password===result[0].password) {
      console.log('matching')
      res.status(200).json("user already exist")
    }
    })
});

app.delete('/deleteUser/:id',(req,res)=>{
  db.deleteitem([req.params.id],(err,results)=>{
    err ? console.log(err,'errrrrrr') : res.json("target deleted")
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});