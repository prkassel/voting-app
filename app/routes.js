var cookieParser = require('cookie-parser');
module.exports = function(router, passport) {
  router.use(cookieParser());

var Poll = require('../models/polls');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login', {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', function(req, res) {
  res.render('signup', {message: req.flash('signupMessage')});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', { user: req.user});
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/newpoll', function(req, res) {
  res.render('newpoll');
});

router.post('/newpoll', function(req, res) {
  var newPoll = new Poll({
    user: req.user.id,
    question: req.body.question,
    options: req.body.option
  });

  newPoll.save(function(err, poll) {
    if (err) {
      throw err;
    }
    console.log('Poll created');
    res.redirect('/poll/' + poll.id);
  });
});

router.get('/poll/:id', function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      res.send(err);
    }
    res.json(poll);
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

}
