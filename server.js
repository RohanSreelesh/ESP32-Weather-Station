const express = require('express');
let app = express();
let awsIot = require('aws-iot-device-sdk');
const fs = require("fs");
const https = require('https');


app.set('views', './views');
app.set("view engine","pug");
//serve public directory and setup for post requests
app.use(express.static('public'));
app.use(express.json());

app.get("/",function(req,res){
    res.render("./home.pug",{result:"test"});    //serve home page
    });

//endpoint that returns json data
app.get("/temperatureDataToday",function(req,res){
    db.all(`SELECT temperature, date FROM temperature_humidity WHERE date(date) = date('now') ORDER BY date ASC;`, (err,row) => {
      if (err) {
        res.status(500).send(err.message);;
      } else {
        console.log(row);
        res.send({result:row});
      }
    });
    });

app.get("/humidityDataToday",function(req,res){
  db.all(`SELECT humidity, date FROM temperature_humidity WHERE date(date) = date('now') ORDER BY date ASC;`, (err,row) => {
    if (err) {
      res.status(500).send(err.message);;
    } else {
      console.log(row);
      res.send({result:row});
    }
  });
  });

app.get("/temperatureDataYday", function(req, res) {
  db.all(
    `SELECT temperature, date FROM temperature_humidity WHERE date(date) = date('now', '-1 day') ORDER BY date ASC;`,
    (err, row) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        console.log(row);
        res.send({ result: row });
      }
    }
  );
});

app.get("/humidityDataYday", function(req, res) {
  db.all(
    `SELECT humidity, date FROM temperature_humidity WHERE date(date) = date('now', '-1 day') ORDER BY date ASC;`,
    (err, row) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        console.log(row);
        res.send({ result: row });
      }
    }
  );
});

app.get("/temperatureDataLweek", function(req, res) {
  db.all(
    `SELECT temperature, date FROM temperature_humidity WHERE date(date) BETWEEN date('now', '-7 days') AND date('now') ORDER BY date ASC;`,
    (err, row) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        console.log(row);
        res.send({ result: row });
      }
    }
  );
});

app.get("/humidityDataLweek", function(req, res) {
  db.all(
    `SELECT humidity, date FROM temperature_humidity WHERE date(date) BETWEEN date('now', '-7 days') AND date('now') ORDER BY date ASC;`,
    (err, row) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        console.log(row);
        res.send({ result: row });
      }
    }
  );
});


app.get("/statistics",function(req,res){
  res.render("./stats.pug",{}); 
  });
//temerature endpoint
app.get("/temperature",function(req,res){
  //return latest temperature from database
  db.all(`SELECT temperature FROM temperature_humidity ORDER BY date DESC LIMIT 1;`, (err,row) => {
    if (err) {
      res.status(500).send(err.message);;
    } else {
      res.send({result:row[0].temperature});
    }
  });
});
//humidity endpoint
app.get("/humidity",function(req,res){
  //return latest humidity from database
  db.all(`SELECT humidity FROM temperature_humidity ORDER BY date DESC LIMIT 1;`, (err,row) => {
    if (err) {
      res.status(500).send(err.message);;
    } else {
      res.send({result:row[0].humidity});
    }
  });
  
});

//start the server, connect the db
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('data.db', (err) => {
  if (err) {
      console.error(err.message);
  }
    app.listen(8080);

  console.log("Server listening on port 8080");
  console.log('Connected to the database.');
  awsData();
  });

async function awsData(){
  
  let device = awsIot.device({
    keyPath: <Your private key>,
  certPath: <Your device certificate>,
    caPath: <AWS access credentials>,
  clientId: 'sdk-nodejs-59dada38-278b-46fe-9aa7-4a4aeebe6a02',
      host: <Your AWS host IP>
  });

  device
  .on('connect', function() {
    console.log('Connected to AWS IOT Core');
    device.subscribe('esp32/pub');
  });

  device
  .on('message', function(topic, payload) {
    //add to database
    let message = JSON.parse(payload.toString())
    //add the data to the database
    db.run(`INSERT INTO temperature_humidity (temperature, humidity, date) VALUES (${message.temperature}, ${message.humidity}, datetime('now'))`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Row inserted successfully!');
      }
    });
  });

};

