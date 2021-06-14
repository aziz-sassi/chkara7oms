const mysql = require('mysql2');
const createTables = require('./config');
const Promise = require('bluebird');
const database = 'chkara7oms';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createConnection({
  user: 'student',
  password: 'Student 12369'
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));



  fetchData = function (callback) {
    let syntax = `SELECT id,username, about FROM users`
    connection.query(syntax,(err,result)=>{
     return err ? callback(err,null) : callback(null,result)
    })
    
  }
  createAccount = function (params,callback) {
    let syntax = `INSERT INTO users (username,password,about) VALUES (?,?,?)`;
    connection.query(syntax,params,function (err,result) {
      err ? callback(err,null) : callback(null,result)
    })
    
  }
  getandcompare = function (params,callback) {
    console.log(params);
    let syntax = `SELECT username,password FROM users WHERE username = ?`
    connection.query(syntax,params,function (err,result) {
      console.log(result, "result of query")

      err ? callback(err,null) : callback(null,result)

    })
  };

  deleteitem = function (params,callback) {
    const syntax = `DELETE FROM users WHERE id = ?`;
    connection.query(syntax,params,(err,results)=>{
      return err ? callback(err, null) : callback(null,results)
    })
  }





module.exports ={ fetchData,createAccount,getandcompare,deleteitem,db};