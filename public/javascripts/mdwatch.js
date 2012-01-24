var MdWatch = (function() {
  var socket
    , $container;

  function init(container) {
    $container = $(container);

    socket = io.connect();
    socket.on('connect', function() {
      console.log('connected');
    });
    socket.on('update', function(html) {
      console.log('update');
      $container.html(html);
    });
  }

  return {
    init: init
  };

})();

$(document).ready(function() {
  MdWatch.init('#main');
});
