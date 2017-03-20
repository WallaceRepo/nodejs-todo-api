   /**
    * Dependencies */

   var express       = require('express'),
       mongoose      = require('mongoose');

   var config           = require('./config'),
       setupController  = require('./controllers/setupController'),
       apiController    = require('./controllers/apiController');

   var app = express();

   /**
    * App Setup */

   app.set('view engine','ejs');
   app.use('/assets', express.static(__dirname + '/public'));

   apiController(app);

   /**
    * DB Setup */

   mongoose.connect(config.getDbConnectionString());
   setupController(app);

   /**
    * Server Setup */

   var port = process.env.port || 3000;

   app.listen(port, function () {
       console.log('Server started on port: ' + port);
   });