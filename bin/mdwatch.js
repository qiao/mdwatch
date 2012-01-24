#!/usr/bin/env node

var path    = require('path')
  , mdwatch = require('../');

function usage(mes) {
  if (mes) {
    console.log(mes + '\n');
  }
  lines = [
      'Usage:'
    , '  mdwatch [-pch] file'
    , ''
    , 'Options:'
    , '  -p, --port=NUM  Listen on port NUM'
    , '  -c, --colorize  Colorize code blocks'
    , '  -h, --help      Display this message'
    , ''
    , 'Examples:'
    , '  $ mdwatch -p 8080 -c ./readme.md'
  ];
  console.log(lines.join('\n'));
}

function main(argv) {
  var arg
    , port
    , file
    , colorize;

  function getArg() {
    var arg = argv.shift();
    arg = arg.split('=');
    if (arg.length > 1) {
      argv.unshift(arg.slice(1).join('='));
    }
    return arg[0];
  }

  while (argv.length) {
    arg = getArg();
    switch (arg) {
      case '-p':
      case '--port':
        port = argv.shift();
        break;
      case '-c':
      case '--colorize':
        colorize = true;
        break;
      case '-h':
      case '--help':
        usage();
        process.exit(0);
        break;
      default:
        file = arg;
        break;
    }
  }

  if (file === process.argv[1]) {
    usage();
    process.exit(0);
  }
  if (!path.existsSync(file)) {
    usage('File not exists: ' + file);
    process.exit(1);
  }

  mdwatch.watch(file, colorize, parseInt(port, 10));
}

main(process.argv.slice());
