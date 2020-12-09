const db = require("../models");

const findAllTasks = (req, res) => {
  db.User.findById(req.user.id)
    .populate("tasks")
    .then((user) => {
      res.json(user.tasks);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

const deleteTask = (req, res) => {
  const id = req.params.id;
  db.User.remove(
    { _id: id }
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      })
  );
};

const updateTask = (req, res) => {
    db.Task.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(task => {
        res.json(task)
    }).catch(err => {
        console.log(err)
        res.sendStatus(422)
    })
}

const createTask = (req, res) => {
  console.log(req.body);
  db.User.findById(req.user.id)
    .then((user) => {
      return user.addTask(req.body);
    })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
};

const continueTask = (req, res) => {
  console.log(req.params.id);
  db.User.findById(req.task._id);
  // findbyId from dbUser
  // pass info to front end timer
};


module.exports = { findAllTasks, deleteTask, createTask, continueTask };


