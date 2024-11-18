const express = require('express')
const app = express()

const { MongoClient } = require('mongodb');
const bodyparser = require("body-parser")

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const cors = require("cors")

const dbName = 'passop';

require('dotenv').config()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
client.connect();

//GET ALL PASSWORDS
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//SAVE THE PASSWORDS
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult })
})

//DELETE THE PASSWORD
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})