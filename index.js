const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'database_test';
const collection = 'my_collection';
let db;

app.use(bodyParser.json());

MongoClient.connect(url, function(err, client){
    db = client.db(dbName);
});

app.post('/create', function(req, res){
    let t = req.body;
    db.collection(collection).insertOne(t, function(err, r){
        res.json(r);
    });
});

app.post('/read', function(req, res){
    db.collection(collection).find({}).toArray(function(err, r){
        console.log(r);
        res.json(r);
    })
});

app.post('/update', function(req, res){
    let t = req.body;
    db.collection(collection).updateOne(t.old_data, {$set: t.new_data}, function(err, r){
        res.json(r);
    });
});

app.post('/delete', function(req, res){
    let t = req.body;
    db.collection(collection).deleteOne(t,  function(err, r){
        res.json(r);
    });
});

app.listen(8080, function(){
    console.log('server started at 8080');
});