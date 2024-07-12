
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fs = require('fs');

// MongoDB URL from the docker-compose file
const db_path = 'mongodb://database:27017/dashboard_db';

// Connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(db_path);

// create mongoose schema
const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    pwd: String
});

// create mongoose model
const User = mongoose.model('User', userSchema);

router.get('/about.json', (req, res) => {
    let aboutData = fs.readFileSync('./about.json');
    let aboutJson = JSON.parse(aboutData);
    aboutJson.client.host = req.connection.remoteAddress.substring(7);
    var tmpDate = new Date();
    var editDate = Math.floor(tmpDate / 1000);
    aboutJson.server.current_time = editDate;
    aboutJson = JSON.stringify(aboutJson, null, 4);
    res.status(200).send(aboutJson);
});

/_ GET all users. _/
router.get('/', (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(users);
        }
    });
});

/_ Create a user. _/
router.post('/', (req, res) => {
    let user = new User({
        name: req.body.name,
        mail: req.body.mail,
        pwd: req.body.pwd
    });

    user.save(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).json({
            message: 'User created successfully'
            });
        }
    });
});

router.put('/:id', async(req, res) => {
    useractu = await User.findById(req.params.id);
    useractu.name = req.body.name;
    useractu.mail = req.body.mail;
    useractu.pwd = req.body.pwd;
    useractu.save(() => {
        res.json();
    });
});

router.delete('/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id,(error)=>{
        res.json({'message':'delete'})
    })
});

router.post('/login', async (req,res)=> {
    try {
        const data = await User.findOne({mail: req.body.mail})
        if (data == null) {
            res.status(404).send({msg: "Not found"})
        }
        if (req.body.pwd === data.pwd) {
            res.status(200).send({msg: "Authenticated"});
        } else {
            res.status(401).send({msg: "Incorrect email or password"});
        }
    } catch (err) {
        console.errror(err)
    }
});

module.exports = router;