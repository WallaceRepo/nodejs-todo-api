/**
 * Dependencies */
var bodyParser  = require('body-parser'),
    Todos       = require('../models/todoModel');


module.exports = function (app) {
    // dependencies setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // GET Route for all todos of one single username
    app.get('/api/todos/:uname', function (req, res) {

        Todos.find({ username: req.params.uname },
        function (err, todos) {
            if(err) throw err;

            res.send(todos);
        });
    });

    // GET Route for one single todos from id
    app.get('/api/todo/:id', function (req, res) {

        Todos.findById({ _id: req.params.id },
            function (err, todo) {
                if(err) throw err;

                res.send(todo);
            });
    });

    // POST Route handles create and update
    app.post('/api/todo', function (req, res) {

        // if id parameter exists treat as update todos
        if(req.body.id){
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            },function (err, todo) {
                if(err) throw err;

                res.send(todo);
            });

        // if id parameter don't exist create new todos
        } else {
            Todos.create({
                username: req.body.username,
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function (err, todo) {
                if(err) throw err;

                res.send(todo);
            });
        }
    });

    // DELETE Route find and remove specific todos by id
    app.delete('/api/todo', function (req, res) {

        Todos.findByIdAndRemove(req.params.id,
            function (err) {
            if(err) throw err;
            res.send('Success');
        });
    });
}