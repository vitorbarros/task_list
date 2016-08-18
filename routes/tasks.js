var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('tasks');
});
router.get('/create', function(req, res){
    res.render('new_task');
});

module.exports = router;
