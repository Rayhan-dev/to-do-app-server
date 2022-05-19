//todoUser
//Ik4Jan7z1NOdMe0b
const express = require('express')
const app = express()
var cors = require("cors");
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.6hkav.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("todoApp").collection("tasks");
async function run() {
    try {
        app.post('/allTasks', async (req,res) => {
            await client.connect();
            const task = req.body;
            const result = await collection.insertOne(task);
            res.send(result);
        })
        app.get('/allTasks', async (req,res) => {
            await client.connect();
            const query = {};
            const cursor = collection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/allTasks/:id', async (req,res) => {
            await client.connect();
            const itemId = req.params.id;
            const query = {_id:ObjectId(`${itemId}`)};
            const cursor = collection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.delete('/allTasks/:id', async (req, res) => {
            await client.connect();
            const itemId = req.params.id;
            const query = {_id:ObjectId(`${itemId}`)};
            const result = await collection.deleteOne(query);
            res.send(result);
        })

    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})