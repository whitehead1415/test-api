var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test-api');

var User = require('./app/models/user');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('json spaces', 2);

var port = 3000;

var router = express.Router();

router.use(function(req, res, next) {
  console.log(req.method + " " + req.protocol + '://' + req.get('host') + req.originalUrl);
  next();
});

router.route('/users')

.post(function(req, res) {
  var baseUrl = req.protocol + '://' + req.get('host');
  var user = new User();
  name = req.body.name;
  if (name == "foo") {
    res.json({ error: "cannot create foo"});
  } else if (name == "bar") {
    res.json({ error: "cannot create bar"});
  } else if (name == "baz") {
    res.json({ error: "cannot create baz"});
  } else {
    user.name = req.body.name;

    user.save(function(err) {
      if (err) send(err);
      res.json(user.toJson(baseUrl));
    })
  }

})

.get(function(req, res) {
  var baseUrl = req.protocol + '://' + req.get('host');
  User.find(function(err, users) {
    if (err) res.send(err);

    for (x in users) {
      users[x] = users[x].toJson(baseUrl);
    }
    res.json(users);
  });
});

router.route('/users/:user_id')

.get(function(req, res) {
  var baseUrl = req.protocol + '://' + req.get('host');
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);
    res.json(user.toJson(baseUrl));
  });
})

.put(function(req, res) {
  var baseUrl = req.protocol + '://' + req.get('host');
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);

    user.name = req.body.name

    user.save(function(err) {
      if (err) res.send(err);
      res.json(user.toJson(baseUrl));
    });
  });
})

.delete(function(req, res) {
  User.remove({ _id: req.params.user_id }, function(err, user) {
    if (err) res.send(err);
      res.json({ message: "Successfully deleted" });
  });
});

app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
