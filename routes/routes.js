var express = require('express');
var router = express.Router()
User = require('../models/user')
Roster = require('../models/roster')
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require('../config');
const { weekdaysMin } = require('moment');

let inMemoryToken;

router.get('/home', (req, res) => {
      res.render("rosterview/selectRoster", {
        viewTitle: "Weekly Roster"
      });
  });

router.get('/', (req, res) => {
    res.render("rosterview/login", {
        viewTitle: "Login"
    });
});

router.get('/roster', (req, res) => {
  Roster.find({ date: req.date}, (err, rosterlist) => {
    if (err) {
      res.status(400).json(err);
    } 
    res.render("rosterview/table", {
      viewTitle: "Weekly Roster",
      list: rosterlist
    })
  })
});

router.post('/roster',(req,res)=> {
    let addRoster = new Roster({
    })

    addRoster.save(function(err, users){
        if(err){
            res.status(400).json(err)
        }else{
            res.render("rosterview/table", {
                viewTitle: "Weekly Roster"
            });
        }
    })
})

router.get('/register', (req,res)=> {
    res.render("rosterview/newuser", {
        viewTitle: "Register a new User"
    });
});

router.get('/newroster', (req, res) => {
  res.render('rosterview/newRoster', {
    viewTitle: "Create a new Roster"
  })
})

router.post('/newroster', (req, res) =>{
    console.log(req.body)
    let newRoster = new Roster({
      date: req.body.date,
      store: req.body.store,
      friM: req.body.friM,
      satM: req.body.satM,
      sunM: req.body.sunM,
      monM: req.body.monM,
      tueM: req.body.tueM,
      wedM: req.body.wedM,
      thuM: req.body.thuM,
      friE: req.body.friE,
      satE: req.body.satE,
      sunE: req.body.sunE,
      monE: req.body.monE,
      tueE: req.body.tueE,
      wedE: req.body.wedE,
      thuE: req.body.thuE
    })
  

  newRoster.save(function(err, roster){
      if(err){
          res.status(400).json(err)
      }
      res.render("rosterview/newRoster", {
        viewTitle: "Create a new Roster"
    });
  })
})

router.post(
    "/user/signup",
    [
        check("fname", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
       
        const fname = req.body.fname,
            lname = req.body.lname,
            email = req.body.email,
            mobile = req.body.mobile,
            password= req.body.password

        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                fname,
                lname,
                email,
                mobile,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
  "/user/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const email = req.body.email,
          password= req.body.password
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){
        return res.status(400).json({
          message: "Incorrect Password !"
        });
      }
      res.render('rosterview/selectRoster',{
        viewTitle: 'Select a date',
        item: user.fname,
        user_id: user.id
      })
      
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

module.exports = router;