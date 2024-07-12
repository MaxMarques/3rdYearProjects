const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

// MongoDB URL from the docker-compose file
const db_path = 'mongodb://database:27017/AreaDB';

// Connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(db_path);

// create mongoose schema
const userSchema = new mongoose.Schema({
    mail: String,
    pwd: String,
    passConfirm: Number,
    isConfirm: Boolean,
    accessToken: String,
    isConnected: Boolean,
    accessTokenSpotify: String,
    refreshTokenSpotify: String,
    expireTimeSpotify: String,
    timestampSpotify: String,
    actionReaction: Array
});

// create mongoose model
const User = mongoose.model('users', userSchema);

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

router.post('/check-code', async (req,res) => {
    try {
        const data = await User.findOne({mail: req.body.email});
        if (Number(req.body.pass) === data.passConfirm) {
            res.status(200).send({msg: "Account Validate"});
        } else {
            res.status(401).send({msg: "Incorrect password"});
        }
    } catch (err) {
        console.error(err)
    }
});

router.post('/check-confirm', async (req,res) => {
    try {
        const data = await User.findOne({mail: req.body.mail});
        if (data.isConfirm === true) {
            res.status(200).send({msg: "Account validate"});
        } else {
            res.status(401).send({msg: "Account not validate"});
        }
    } catch (err) {
        console.error(err)
    }
});

/_ Create a user. _/
router.post('/', async (req, res) => {
    let user = new User({
        mail: req.body.mail,
        pwd: req.body.hashedPassword,
        passConfirm: req.body.passConfirm,
        isConfirm: req.body.isConfirm,
        isConnected: req.body.isConnected,
        accessToken: "",
        accessTokenSpotify: null,
        refreshTokenSpotify: null,
        expireTimeSpotify: null,
        timestampSpotify: null,
        actionReaction: []
    });

    try {
        const users = await User.findOne({mail: req.body.mail});
        if (users !== null) {
            res.status(404).send({msg: "Existing user"});
            return;
        }
    } catch (err) {
        console.error(err);
    }

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

router.post('/create-google', async (req, res) => {
    let user = new User({
        mail: req.body.mail,
        pwd: req.body.hashedPassword,
        passConfirm: req.body.passConfirm,
        isConfirm: req.body.isConfirm,
        isConnected: req.body.isConnected,
        accessToken: req.body.accessToken,
        actionReaction: []
    });

    try {
        const users = await User.findOne({mail: req.body.mail});
        if (users !== null) {
            res.status(404).send({msg: "Existing user"});
            return;
        }
    } catch (err) {
        console.error(err);
    }

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

router.put('/', async(req, res) => {
    useractu = await User.findOne({mail: req.body.email});
    if (req.body.passConfirm === 0)
        useractu.isConfirm = req.body.isConfirm;
    else
        useractu.passConfirm = Number(req.body.passConfirm);
    useractu.save(() => {
        res.json();
    });
});

router.put('/user-connected', async(req, res) => {
    const user = await User.findOne({mail: req.body.email});
    if (user === null) {
        res.status(404).send({msg: "User not create"})
    } else {
        user.isConnected = req.body.isConnected;
        user.save(() => {
            res.json();
        });
    }
});

router.put('/get-spotify-log', async(req, res) => {
    const user = await User.findOne({mail: req.body.email});
    if (user) {
        user.accessTokenSpotify = req.body.accessTokenSpotify;
        user.refreshTokenSpotify = req.body.refreshTokenSpotify;
        user.expireTimeSpotify = req.body.expireTimeSpotify;
        user.timestampSpotify = req.body.timestampSpotify;
        user.save(() => {
            res.json();
        });
    }else {
        res.status(404).send({msg: "User not create ", user})
    }
    
});

router.delete('/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id,(error)=>{
        res.json({'message':'delete'})
    })
});

router.post('/login', async (req,res)=> {
    try {
        const data = await User.findOne({mail: req.body.mail})
        if (data === null) {
            res.status(404).send({msg: "Not found"})
        }
        if (req.body.hashedPassword === data.pwd) {
            res.status(200).send({msg: "Authenticated"});
        } else {
            res.status(401).send({msg: "Incorrect email or password"});
        }
    } catch (err) {
        console.error(err)
    }
});

router.post('/login-google', async (req,res)=> {
    try {
        const data = await User.findOne({mail: req.body.mail})
        if (data === null) {
            res.status(404).send({msg: "Not found"})
        }
        data.isConnected = req.body.isConnected;
        data.accessToken = req.body.accessToken;
        data.save(() => {
            res.json();
        });
        res.status(200).send({msg: "Authenticated"});
    } catch (err) {
        console.error(err)
    }
});

router.get('/get-user-connected', async (req, res) => {
    const connected = await User.findOne({isConnected: true});
    if (connected === null) {
        res.status(201).send({msg: "Not connect"});
    } else {
        res.status(200).send({msg: "Connect", mail: connected.mail});
    }
});

router.get('/google-access-token', async (req, res) => {
    const connected = await User.findOne({isConnected: true});
    if (connected === null) {
        res.status(201).send({msg: "Can't disconnect"});
    } else {
        res.status(200).send({msg: "Disconnect", accessToken: connected.accessToken});
    }
});

router.get('/get-action-reaction', async (req, res) => {
    const connected = await User.findOne({isConnected: true});
    if (connected === null) {
        res.status(401).send({msg: "Can't disconnect"});
    } else if (connected.actionReaction.length === 0) {
        res.status(201).send({msg: "Disconnect", actionReaction: null});
    } else {
        res.status(200).send({msg: "Disconnect", actionReaction: connected.actionReaction});
    }
});

router.put('/add-action-reaction', async(req, res) => {
    const user = await User.findOne({isConnected: true});
    if (user === null) {
        res.status(404).send({msg: "User not create"})
    } else {
        user.actionReaction.push(req.body.actionReaction);
        user.save(() => {
            res.json();
        });
        res.status(200).send({msg: "Add to DB"})
    }
});

module.exports = router;