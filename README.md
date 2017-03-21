# NodeJS TODO API
_Following @AnthonyPAlicea , [Udemy course Learn and Understand NodeJS.](https://www.udemy.com/understand-nodejs/)_

NodeJS TODO API Sample Project for studying purposes.
For following this project you need to be familiar with the Terminal,
 and have Node and MongoDB installed.

### 1) Start the project:

First create a folder for your application, you can name it ToDoApp for example. 
In the Terminal cd into the folder, you'll keep running from there during
 the whole project.
Than run on terminal the following command inside the folder ToDoApp:

```sh
$ npm init
```
You can customize your parameters or press enter for skipping all the steps.

### 2) Setup basic dependencies:

You need to use NPM to install some dependencies that are needed to the project. Run on terminal:

```sh
$ npm install express body-parser mongoose --save
```
Now you can make use of the three installed dependencies:
- Express
- Body-parser
- Mongoose


### 3) Create project folder structure:

Following the diagram, create the needed folders and files with the
 correct names and extensions. Note that the ToDoApp folder you already
  have together with package.json and the folder node_modules.
  
```
ToDoApp
│   package.json <--- (You should already have it after step 1)
│   app.js     
│
└───models
│   │   todoModel.js
│   
│   
└───controllers
│    │   apiController.js
│    │   setupController.js
│
│    
└───config
│    │   index.js
│
│
└───node_modules <--- (You should already have it after step 2)
```
### 4) Create app.js file:

Now that you have the necessary files open the app.js and type the following code.
This will setup the basic server functionality.
````javascript
/*** Dependencies */

var express       = require('express');
var app = express();

/*** Server Setup */

var port = process.env.port || 3000;

app.listen(port, function () {
   console.log('Server started on port: ' + port);
});

````

### 5) Setup MongoDB: 

To setup MongoDB you need to follow a few steps:
1. Start mongod to serve your database, by opening a new Terminal window and running:
````sh
$ mongod
````
Leave this window open until the end of the process,
 when everything is finished you can run `Ctrl + c` to finish the daemon.
 
2. Open the file todoModel.js, inside the models folder and type the code:
````javascript
/*** Dependencies */

var mongoose = require('mongoose');

/*** Setup */

var todoSchema = new mongoose.Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;
````
 This code is setting up the MongoDB schema for the Todos,
  requiring mongoose as a dependency and exporting the Schema.

3. Open the file index.js, inside the config folder and type the code:
````javascript
module.exports = {

    // setting up mongo db at localhost

    getDbConnectionString: function () {
        return 'localhost:27017/node_todos_db';
    }

}
````
This file is responsible for setting up the connection string with the MongoDB,
so in case you are going to use a different environment you just need to change
 the return string. Is also recomended to create a config.json file with the 
 credentials for the database and requiring, for this example no credentials 
 are used.
 
 4. Open the file setupController.js, inside the controllers folder and type the code:
 
 ```javascript
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
                 "username": "Catalina",
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
             }
         ];
         Todos.create(starterTodos, function (err, results) {
             res.send(results);
         });
     });
 
 }
 ```
 
This code is requiring the Todos Schema, and seeding the database with some
 dummy data in order to test the API. So in the GET Route /api/setupTodos, 
 the Todos.create() command is adding new Todos to the database following the 
 Schema created.
 
 5. Open the app.js file, inside ToDoApp folder and add to the existing
  code the following:
  
  ```javascript
/*** Dependencies */
// Add this code together with the existing dependencies comment: 
var mongoose         = require('mongoose');
var config           = require('./config');
var setupController  = require('./controllers/setupController');

/*** DB Setup */
// Add this code to the bottom of the existing code:
mongoose.connect(config.getDbConnectionString());
setupController(app);
```
This new dependencies are allowing the app to access mongoose commands, 
together with the configuration and seed file. The DB Setup is connecting to 
the database placed in the config file path and later executing the seeding.

### 6) Setup API Routes:

Open the apiController.js file, inside controllers folder and type the code:
```javascript
/*** Dependencies */
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
```

This code is requiring Body-Parser to retrieve data from the HTML and URL,
 and the Todos Schema finally exporting the API Routes.
Following the REST convention and the CRUD operations there are 5 routes:
1. GET Route `/api/todos/:uname` - uses mongoose find method to retrieve 
all todos from one username `:uname`;
2. GET Route `/api/todo/:id` - uses mongoose findById method to retrieve 
one single todo from one `:id`, note that the route is similar to the first one 
if it was `/todos` instead of `/todo` would be exact the same Route;
3. POST Route `/api/todo` - if the parameter `id` is sent to this route,
 and exist, so is treated as an UPDATE route, editing the values 
 for the existing todo, using mongoose method findByIdAndUpdate;
4. POST Route `/api/todo` - if the parameter `id` is NOT sent to this route,
than is treated as an CREATE route, adding the new todo, using mongoose 
method create;
5. DELETE Route `/api/todo` - uses mongoose method findByIdAndRemove and 
delete the todo with the specific `id` sent as a parameter;

Additionally in the app.js you need to call the API Routes:
```javascript
/*** Dependencies */
// Add this code together with the existing dependencies comment: 
var apiController    = require('./controllers/apiController');

/*** App Setup */
// Add this code to the bottom of the existing code:
apiController(app);
```

### 7) Run Node app.js:

On the Terminal (the one that is not running mongod, you can open a new 
window if it's necessary), run the following command to start your app:
```sh
$ node app.js
```
### 8) Seed data to your database:

On your browser go to the URL http://localhost:3000/api/setupTodos 

### 9) Play with your API Routes:

The GET Routes you can play straight from your browser:

1. http://localhost:3000/api/todos/:uname  - replace `:uname` by one of the 
Users you got from the step 8 and see what you get;
2. http://localhost:3000/api/todo/:id - replace `:id` by one of the Id you 
got from the step 8 and see what you get;

For the POST and DELETE Routes I recommend you to check [Postman](https://www.getpostman.com/).