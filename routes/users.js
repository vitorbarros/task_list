var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/auth', function(req, res) {
  res.render('login');
});

module.exports = router;
