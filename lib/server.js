var express   = require('express')
  , sio       = require('socket.io')
  , fs        = require('fs')
  , markdown  = require('./markdown')

// Configure express server.
var app = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', function(req, res, next) {
  res.render('index', { layout: false });
});


/**
 * @param {String} filename - file to monitor
 * @param {Boolean} colorize - Whether to colorize the codeblocks
 * @param {number} port - port to listen
 */
exports.watch = function(filename, colorize, port) {
  port = port || 3000;

  // start express server
  app.listen(port);
  console.log("Server listening on port", app.address().port);

  // Configure socket.io
  var io = sio.listen(app);
  io.disable('log');

  // Read from the raw markdown file and send the rendered content to the client.
  function update(filename, socket) {
    fs.readFile(filename, function(err, data) {
      if (!err) {
        markdown(data.toString(), colorize, function(html) {
          socket.emit('update', html);
          console.log('update: ', (new Date()).toTimeString());
        });
      }
    });
  }

  // when the client first connects to the server, send the rendered file.
  io.sockets.on('connection', function(socket) {
    update(filename, socket);
  });

  // watch for file updates.
  fs.watchFile(filename, function() {
    update(filename, io.sockets);
  });

};
