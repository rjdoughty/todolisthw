
// Data
// ===========================================================
//const tasklist = [];
    //     {
    //     todoItem: 'clean garage'
    // }, {
    //     todoItem: 'wash car'
    // }


    // Require all models
    const db = require('../models');


// Require path so we can find the index.html file
const path = require('path');
// Routes
// ===========================================================
module.exports = function(app) {

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// Displays all task
app.get('/api/taskList', function(req, res) {
  db.Tasklist.find({})
  .then(function(dbTasklist) {
      res.json(dbTasklist);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Adds a new task

app.post('/api/taskList', function(req, res) {
  db.Tasklist.create(req.body)
  .then(function(dbTasklist) {
      res.json(dbTasklist);
})
.catch(function(err) {
  res.json(err);
  });
});


// Finds the requested task and replaces it one provided in the request body
app.put('/api/taskList', function(req, res) {

  db.Tasklist.findOneAndUpdate({todoItem: req.body.todoItem}, {$set: {completed: req.body.completed}})
  .then(function (dbTasklist) {
      res.json(dbTasklist);
  })
  .catch(function(err) {
      res.json(err);
  });
});


// Finds the requested task and deletes it from the collection
app.delete('/api/taskList', function(req, res) {
  db.Tasklist.findOneAndRemove({todoItem: req.body.todoItem})
  .then(function (dbTasklist) {
      res.json(dbTasklist);
  })
  .catch(function(err) {
      res.json(err);
  });
});
};