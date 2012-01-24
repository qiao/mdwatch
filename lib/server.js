var express   = require('express')
  , sio       = require('socket.io')
  , fs        = require('fs')
  , marked    = require('marked')
  , pygments  = require('pygments')

// configure express server.
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

app.post('/colorize', function(req, res, next) {
  var html = req.body.html
    , lang = req.body.lang;
  pygments.colorize(html, lang, 'html', function(data) {
    res.send(data, 200);
  });
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

  // configure socket.io
  var io = sio.listen(app);
  io.disable('log');

  // read from the raw markdown file and send the rendered content to the client.
  function update(filename, socket) {
    fs.readFile(filename, function(err, data) {
      if (!err) {
        socket.emit('update', marked.parse(data.toString()));
        console.log('update', (new Date()).toTimeString());
      }
    });
  }

  // when the client first connects to the server, send the rendered file.
  io.sockets.on('connection', function(socket) {
    socket.emit('config', { colorize: colorize });
    update(filename, socket);
  });

  // watch for file updates.
  // here's a tricky thing that worth noticing:
  // `fs.readFile` will truncate the `atime` property of the file, and this
  // will also trigger the execution of the callback function of `fs.watchFile`,
  // and this will lead to another call on `fs.readFile`.
  // therefore, we have to check the `mtime` property of the current and previous
  // file to make sure that the callback is being executed only when the file is
  // really being modified.
  fs.watchFile(filename, function(curr, prev) {
    if (curr.mtime.toTimeString() !== prev.mtime.toTimeString()) {
      update(filename, io.sockets);
    }
  });

};
