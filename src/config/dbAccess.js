const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

function readDb() {

  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
       reject(err);
       //console.log("err",err)
        return;
      }
     // console.log("readDb",JSON.parse(data))
      resolve(JSON.parse(data));
    });
  });
}

function writeDb(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { readDb, writeDb };