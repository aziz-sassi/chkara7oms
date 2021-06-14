const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create a table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      password VARCHAR(25),
      about VARCHAR(255)
    );`)
    .error(err => {
      console.log(err);
    });
};