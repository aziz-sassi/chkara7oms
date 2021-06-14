const express = require('express');
const db = require('./db');
const app = express();
const port = 1337;
const path = require ('path');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(express.static(path.join(__dirname, '..','client', 'build')));
app.use(bodyParser.json())




app.get("/getusers",(req,res)=>{
  db.fetchData(function (err,result) {
  err ? console.error(err) :  res.status(201).json(result)
  })
})

app.post('/loginForm', async(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);

  db.getandcompare([username, password],async(err,result)=>{

    if (result[0]===undefined) {
      console.log('cant loginnnnn')
      res.status(200).json("notLogged")
      return;
      
    }

    const comparison = await bcrypt.compare(password, result[0].password)          
    console.log("comparison",comparison);
    if (err) {
      console.error(err)
    }
    else if (!comparison) {
      console.log('cant login')
      res.status(200).json("notLogged")
    }
    else if (comparison) {
      console.log('matching')
      res.status(200).json("Match")
    }
    })
});
var hashedPassword ;
app.post('/createAccount',async(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  var about = req.body.about;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)


  db.getandcompare([username, encryptedPassword],(err,result)=>{
    if (err) {
      console.error(err)
      console.log(encryptedPassword,password)
    }
    else if (result[0]===undefined) {
  db.createAccount([username, encryptedPassword,about],(err,result)=>{
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