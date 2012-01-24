mdwatch
=======

`mdwatch` is a tool to help you preview your markdown documents. It can detect the changes on the file and automatically serve the rendered page in your brower.

Install
-------

`mdwatch` is a `Node.js` application. So you need to install `Node.js` and `npm` first.

Then, you can use `npm` to install `mdwatch`:

    sudo npm install -g mdwatch

Usage
-----

To monitor a markdown file, simply:

    mdwatch FILENAME

This will start a webserver on port 3000. Now navigate your browser to `http://localhost:3000`, you will see the rendered document.

You may use `-p` to specify another port.

    mdwatch -p 8080 FILENAME

`mdwatch` also supports syntax highlighting. To enable it, you have to install `python2.x` and `pygments` first, then use `-c` to colorize the code blocks.

    mdwatch -c FILENAME
