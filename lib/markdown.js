var async    = require('async')
  , marked   = require('marked')
  , pygments = require('pygments')

/**
 * Use pygments to highlight the given lexer token if it is a codeblock.
 */
function highlight(token, callback) {
  if (token.type === 'code' && token.lang) {
    pygments.colorize(token.text, token.lang, 'html', function(data) {
      token.text = data;
      token.type = 'html';
      token.escaped = true;
      callback();
    });
  } else {
    callback();
  }
}

module.exports = function(text, colorize, callback) {
  var tokens = marked.lexer(text);
  if (colorize) {
    async.forEach(tokens, highlight, function() {
      html = marked.parser(tokens);
      callback(html);
    });
  } else {
    callback(marked.parse(text));
  }
};
