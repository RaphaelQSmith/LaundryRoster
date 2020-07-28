var express = require('express');
var router = express.Router()
User = require('../models/user')
Roster = require('../models/roster')
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require('../config');

router.get('/home', (req, res) => {
  if(!req.session.logged){
    req.session.logged = false;
  }
  if(req.session.logged == false){
    res.render("rosterview/login", {
      viewTitle: "Please login first!"
    })
  }else{
  res.render("rosterview/selectRoster", {
        viewTitle: "Weekly Roster"
      });
  }
});

router.get('/', (req, res) => {
    res.render("rosterview/login", {
        viewTitle: "Login"
    });
});

router.get('/logout', (req, res) =>{
  if(!req.session.logged){
    req.session.logged = false;
  }else if(req.session.logged == true){
    req.session.logged = false
  }
  res.redirect('/')
})

router.post('/roster',(req, res)=> {
  if(!req.session.logged){
    req.session.logged = false;
  }
  if(req.session.logged == false){
    res.redirect('/')
  }
  //  check user id
  User.findById({ _id: req.body.user_id}, (err, user) => {
    if(err){
      res.redirect('/')
    }else{
      Roster.find({ date: req.body.date}, (err, rosterlist) => {
        console.log(rosterlist)
        if (err) {
          res.status(400).json(err);
        } 
        res.render("rosterview/table", {
          viewTitle: "Weekly Roster",
          list: rosterlist,
          date: req.body.date
        })
      }).lean()
    }
  }).lean()
});

router.get('/register', (req,res)=> {
  if(!req.session.logged){
    req.session.logged = false;
  }
  if(req.session.logged == false){
    res.redirect('/')
  }else{
    res.render("rosterview/newuser", {
        viewTitle: "Register a new User"
    })
  }
});

router.get('/newroster', (req, res) => {
  if(!req.session.logged){
    req.session.logged = false;
  }
  if(req.session.logged == false){
    res.redirect("/")
  }else{
    res.render('rosterview/newRoster', {
    viewTitle: "Create a new Roster"
  })}  
})

router.get('/delete/:id', (req, res) =>{
  Roster.findByIdAndRemove(req.params.id, (err, rst) => {
    if(!err){
      res.render("rosterview/table", {
        viewTitle: "Weekly Roster",
      })
    }
  })
})

router.post('/newroster', (req, res) =>{
    console.log(req.body)
    let newRoster = new Roster({
      date: req.body.date,
      store: req.body.store,
      mor: {
        shiftM: "Morning",
        friM: req.body.friM,
        satM: req.body.satM,
        sunM: req.body.sunM,
        monM: req.body.monM,
        tueM: req.body.tueM,
        wedM: req.body.wedM,
        thuM: req.body.thuM
      },
      eve : {
        shiftE: "Evening",
        friE: req.body.friE,
        satE: req.body.satE,
        sunE: req.body.sunE,
        monE: req.body.monE,
        tueE: req.body.tueE,
        wedE: req.body.wedE,
        thuE: req.body.thuE
      }
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
        check("email", "Please enter a valid emai l").isEmail(),
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
      req.session.logged = true;
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