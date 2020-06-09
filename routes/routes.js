var express = require('express'),
router = express.Router(),
rosterCtrl = require('../controller/rostercontroller');

router.get('/', (req, res) => {
    res.render("rosterview/table", {
        viewTitle: "Weekly Roster"
    });
});

router.get('/register',(req,res)=> {
    res.render("rosterview/newuser", {
        viewTitle: "Register a new User"
    });
});

module.exports = router;