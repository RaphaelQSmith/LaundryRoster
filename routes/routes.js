var express = require('express');
var router = express.Router()
User = require('../models/user')
newRoster = require('../models/roster')
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')


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

// router.post('/register/user', (req, res) =>{
//     console.log(req.body);
//     let newUser = new User({
//         fname: req.body.fname,
//         lname: req.body.lname,
//         email: req.body.email,
//         mobile: req.body.mobile,
//         password: req.body.password
//     });

//     newUser.save(function(err, users){
//         if(err){
//             res.status(400).json(err)
//         }else{
//         res.redirect("/");
//         }
//     })
// });

router.get('/newroster', (req, res) => {
  res.render('rosterview/newRoster', {
    viewTitle: "Create a new Roster"
  })
})

router.post('/newroster', (req, res) =>{
    console.log(req.body)
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

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
                );
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

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.get("/user/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;