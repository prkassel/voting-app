var cookieParser = require('cookie-parser');
module.exports = function(router, passport) {
  router.use(cookieParser());

var Poll = require('../models/polls');
var Vote = require('../models/vote');

/* GET home page. */
router.get('/', function(req, res, next) {
  Poll.find(function(err, polls) {
    console.log(polls);
    res.render('index', { title: 'Express', polls: polls });
  })
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
  Poll.find({user: req.user.id}, function(err, polls) {
    if (err) {
      res.send(err);
    }
    console.log(polls);
    res.render('profile', {user: req.user, polls: polls});
  });
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

    Vote.aggregate([{
      $match: {poll: req.params.id}}, {
      $group: {_id: "$vote", total: {$sum : 1}}}
    ], function(err, vote) {
      console.log(vote);
      res.render('vote', {question: poll.question, options: poll.options, id: poll.id, vote: vote});
    });
  });
});

router.post('/vote', function(req, res) {
  var newVote = new Vote({
    poll: req.body.poll_id,
    vote: req.body.vote
  });
  newVote.save(function(err, vote) {
    if(err) {
      res.send(err);
    }
    res.redirect('/poll/' + vote.poll);
  });
});

router.get('/api/:id', function(req, res) {
  Poll.findById(req.params.id, function(err, poll) {
    if (err) {
      res.send(err);
    }

    Vote.aggregate([{
      $match: {poll: req.params.id}}, {
      $group: {_id: "$vote", total: {$sum : 1}}}
    ], function(err, vote) {
      console.log(vote);
      res.json({question: poll.question, options: poll.options, id: poll.id, vote: vote});
    });
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

}
