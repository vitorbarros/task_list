var path = require('path');
var fs = require('fs');
var lodash = require('lodash');

//database connection
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root:root@localhost:3306/task_list');

//object database
var db = {};

fs.readdirSync(__dirname)
  .filter(function(file){
    return (file !== 'index.js');
  })
  .forEach(function(file, key){
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db)
    .forEach(function(model){
        if(!db[model].hasOwnProperty('associate')){
            return;
        }
        return db[model].associate(db);
    });

//exportando modulo do sequelize e sua instancia mais os models
module.exports = lodash.extend({
  Sequelize:Sequelize,
  sequelize:sequelize
}, db);
