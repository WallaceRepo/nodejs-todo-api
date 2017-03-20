   /**
    * Dependencies */

   var express = require('express');
   var app = express();

   /**
    * App Setup */

   app.use('view engine','ejs');

   /**
    * Server Setup */

   var port = process.env.port || 3000;

   app.listen(port, function () {
       console.log('Server started on port: ' + port);
   });