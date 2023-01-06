const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('mongodb://127.0.0.1/milos', ['events']);
const PORT = '3005';

const app = express();

// const cors = require('cors');
// app.use(cors());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

app.use(express.json());

// app.use(express.static(__dirname + "/public"));

app.post('/save', (req, res) => {
    let msg = req.body.msg;
    db.events.insert({ msg: msg, quantity: 0 }, (err, data) => {
        res.send("Sve  ok");
    })
})

app.get('/get_data', (req, res) => {
    db.events.find((err, data) => {
        res.send(data);
    })
})

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    db.events.findOne({ "_id": db.ObjectId(id) }, (err, data) => {
        res.send(data);
    })
})

app.post('/update', (req, res) => {
    let id = req.body.id;
    db.events.update({ "_id": db.ObjectId(id) }, {
        $set: {
            msg: req.body.msg,
            quantity: req.body.quantity
        }
    }, (err, data) => {

    })
})

app.post('/delete', (req, res) => {
    let id = req.body.id;
    db.events.remove({ "_id": db.ObjectId(id) }, (err, data) => {
        res.send("Deleted");
    })
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
