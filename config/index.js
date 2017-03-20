// configuration file import for setting username and password for db

// var configValues = require('./config.json');

module.exports = {

    // for setting up the connection to a mongoose database in a server

    // getDbConnectionString: function () {
    //     return 'mongodb://' + configValues.uname
    //     + ':' + configValues.pwd +
    //             'db_url:db_port/db_name';
    // }

    // setting up mongo db at localhost

    getDbConnectionString: function () {
        return 'localhost:27017/node_todos_db';
    }

}