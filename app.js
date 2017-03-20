   /**
    * Dependencies */

   var express       = require('express'),
       mongoose      = require('mongoose');

   var config = require('./config');

   var app = express();

   /**
    * App Setup */

   app.use('view engine','ejs');
   app.use('/assets', express.static(__dirname + '/public'));

   /**
    * DB Setup */

   mongoose.connect(config.getDbConnectionString());

   /**
    * Server Setup */

   var port = process.env.port || 3000;

   app.listen(port, function () {
       console.log('Server started on port: ' + port);
   });