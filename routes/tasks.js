var express = require('express');
var router = express.Router();
var db = require('./../models');

//index
router.get('/', function(req, res){
    db.Tasks.findAll()
        .then(function(result){
            res.render('tasks', {
                tasks: result
            });
        })
        .catch(function(err){
            console.log('Error in findAll tasks => ', err);
        });
});
//show
router.get('/:id', function(req, res){
    db.Tasks.findById(req.params.id)
        .then(function(result){
            res.render('task', {
                task: result
            });
        })
        .catch(function(err){
            console.log('Error in find one task => ', err);
        });
});
//store
router.post('/', function(req, res){
    if(!req.body.name || !req.body.name.length){
        return res.redirect('/tasks/create');
    }
    db.Tasks.create(req.body)
        .then(function(result){
            return res.redirect('/tasks');
        })
        .catch(function(err){
            console.log('Error While Creating a task => ', err);
        });
});
//delete
router.delete('/:id', function(req, res){
    db.Tasks.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function(){
        return res.redirect('/tasks');
    })
    .catch(function(err){
        console.log('Error while deleting a task => ', err);
    });
});
//create
router.get('/create', function(req, res){
    res.render('new_task');
});
//edit
router.get('/edit/:id', function(req, res){
    db.Tasks.findById(req.params.id)
        .then(function(result){
            res.render('edit_task', {
                task: result
            });
        })
        .catch(function(err){
            console.log('Error while editing a task => ', err);
        });
});
//update
router.put('/:id', function(req, res){
    db.Tasks.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(function(result){
        return res.redirect('/tasks');
    })
    .catch(function(err){
        console.log('Error while deleting a task => ', err);
    });
});

module.exports = router;
