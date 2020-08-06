const User = require('../models/user');
const bcrypt = require("bcryptjs");

exports.login = async(req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({email});

  if( user && await bcrypt.compare(password, user.password) ) {
    req.session.logged = true;
    res.render('rosterview/selectRoster',{
      viewTitle: 'Select a date',
      item: user.fname,
      user_id: user.id
    });
  } else {
    res.render("rosterview/login", {
      viewTitle: "Login",
      errors: "Email & Password don't match!"
    });
  }
}