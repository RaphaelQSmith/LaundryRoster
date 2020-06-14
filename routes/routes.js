var express = require('express')
router = express.Router()
User = require('../models/user')
newRoster = require('../models/roster')


router.get('/', (req, res) => {
    res.render("rosterview/selectRoster", {
        viewTitle: "Weekly Roster"
    });
});
router.get('/roster', (req, res) => {
    res.render("rosterview/table", {
        viewTitle: "Weekly Roster"
    });
});
router.post('/roster',(req,res)=> {
    let addRoster = new newRoster({

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

router.get('/register',(req,res)=> {
    res.render("rosterview/newuser", {
        viewTitle: "Register a new User"
    });
});

router.post('/register/user', (req, res) =>{
    console.log(req.body);
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    });

    newUser.save(function(err, users){
        if(err){
            res.status(400).json(err)
        }else{
        res.redirect("/");
        }
    })
});

router.get('/newroster', (req, res) => {
  res.render('rosterview/newRoster', {
    viewTitle: "Create a new Roster"
  })
})

router.post('/newroster', (req, res) =>{
    console.log(req.body)
})

module.exports = router;