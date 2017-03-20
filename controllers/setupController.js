var Todos = require('../models/todoModel');

module.exports = function (app) {

    app.get('/api/setupTodos', function (req, res) {
       // seed database
        var starterTodos = [
            {
                "username": "Catalina",
                "todo": "duis exercitation reprehenderit minim",
                "isDone": true,
                "hasAttachment": false
            },
            {
                "username": "Griffith",
                "todo": "laborum minim adipisicing officia",
                "isDone": true,
                "hasAttachment": false
            },
            {
                "username": "Terry",
                "todo": "in tempor ullamco fugiat",
                "isDone": false,
                "hasAttachment": true
            },
            {
                "username": "Ball",
                "todo": "nulla commodo eiusmod do",
                "isDone": false,
                "hasAttachment": true
            },
            {
                "username": "Joseph",
                "todo": "irure mollit aliqua et",
                "isDone": true,
                "hasAttachment": false
            },
            {
                "username": "Kaufman",
                "todo": "ut ex consequat mollit",
                "isDone": false,
                "hasAttachment": false
            },
            {
                "username": "Marguerite",
                "todo": "tempor veniam duis qui",
                "isDone": true,
                "hasAttachment": false
            },
            {
                "username": "Opal",
                "todo": "labore laboris deserunt aliquip",
                "isDone": true,
                "hasAttachment": false
            }
        ];
        Todos.create(starterTodos, function (err, results) {
            res.send(results);
        });
    });

}

