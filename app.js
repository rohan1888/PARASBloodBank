const express = require('express');
const path = require('path');
const app = express();
const hbs = require("hbs");
require("dotenv").config();
const mongoose = require('mongoose');
const static_path = path.join(__dirname, "/public");
const template_path = path.join(__dirname, "/Template/views");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGOURL;
const adminModel = require('./admin.model')
const donorModel = require('./donor.model')
mongoose.connect(mongoDB).catch((err) => { if (err) { console.log(`Unable to connect to the server : ${err}`) } else { comsole.log("connected") }; })
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/adminLogin', (req, res) => {
    res.render("loginAdmin")
})

app.post('/login', (req, res) => {
    const body = req.body
    const uname = body.userName
    const pass = body.password
    // console.log(uname)
    adminModel.find({ userName: `${uname}` }).then(db => {
        console.log(db[0].password);
        if (db[0].password === `${pass}`) {
            res.redirect('/dashboard_index')
        }
        else {
            res.redirect('/')
        }
    }).catch((err) => {
        // console.log(err)
        res.redirect('/')
    })
})

app.get('/dashboard_index', (req, res) => {
    res.render("dashboard_index")
})

app.get('/add_donor_index', (req, res) => {
    res.render("add_donor_index")
})

app.get('/donate', (req, res) => {
    res.render("addDoner2")
})

app.get('/need', (req, res) => {
    res.render("need-blood")
})

app.post('/getBloodData', (req, res) => {
    const body = req.body;
    const blood = body.bloodgrp;
    // console.log(blood);

    donorModel
        .find({ bloodgrp: blood })
        .then(db => {
            if (db && db.length > 0) {
                // console.log(db)
                res.render('card', { cardsdata: db });
            } else {
                res.send('No donor with the given blood group found.');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred while fetching blood data.');
        });
});

app.get('/donor_list_index', (req, res) => {
    donorModel.find({})
        .then(data => {
            res.render('donor_list_index2', { cardsdata: data });
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            res.status(500).send('An error occurred while fetching data.');
        });
});

app.post('/update', (req, res) => {
    console.log("Rohan")
    const body = req.body;
    const email = body.email;
    const mob = body.Mob;
    const addr = body.addr;
    const update = { Mob: mob };

    donorModel.findOneAndUpdate({ email: email }, update, { new: true })
        .then(updatedDonor => {
            if (!updatedDonor) {
                console.log("Donor not found");
                return res.status(404).send('Donor not found.');
            }
            res.render("dashboard_index");
        })
        .catch(err => {
            console.log('Error updating donor:', err);
            res.status(500).send('An error occurred while updating the donor.');
        });
});

app.post('/deleteRow', (req, res) => {
    const mobileNumber = req.body.mobileNumber;

    donorModel.findOneAndDelete({ Mob: mobileNumber })
        .then(deletedDonor => {
            if (!deletedDonor) {
                console.log(mobileNumber);
                res.json({ success: false, message: 'Failed to delete the row.' });
            } else {
                res.json({ success: true });
            }
        })
        .catch(err => {
            console.log('Error deleting donor:', err);
            res.json({ success: false, message: 'Failed to delete the row.' });
        });
});
app.get('/Update_contact_info', (req, res) => {
    res.render("Update_contact_info_index");
})


app.get('*', (req, res) => {
    res.render("index");
})


app.post('/saved', (req, res) => {
    const body = req.body
    const fname = body.fullName
    const mob = body.Mob
    const email = body.email
    const age = body.age
    const gen = body.gender
    const bloodgrp = body.bloodgrp
    const addr = body.addr
    console.log(fname, mob, email, age, gen, bloodgrp, addr)
    const newUser = new donorModel({
        fullName: fname,
        Mob: mob,
        email: email,
        age: age,
        gender: gen,
        bloodgrp: bloodgrp,
        addr: addr
    });
    newUser.save().then(savedUser => {
        res.redirect('/add_donor_index');
    })
        .catch(error => {
            console.log(error);
        });

})

app.listen(process.env.PORT, () => {
    console.log("server listening");
})