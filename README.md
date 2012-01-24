mdwatch
=======

`mdwatch` is a tool to help you preview markdown documents. It watches the file for changes and will automatically serve the updated content in your browser.

Install
-------

`mdwatch` is a `Node.js` application. So you need to install `Node.js` and `npm` first.

Then, you can use `npm` to install `mdwatch`:

    sudo npm install -g mdwatch

Usage
-----

To watch a markdown file, simply do:

    mdwatch FILENAME

This will start a web server on port 3000. Navigate your browser to `http://localhost:3000` and you will see the rendered document. Now try to edit and save the markdown file, and you will see the content in your browser updated.

If you want the server to listen on another port, then you may use the `-p` option.

    mdwatch -p 8080 FILENAME

`mdwatch` can also colorize your code blocks. To do so, you will have to install `python` and `pygments` first. And use the `-c` option:

    mdwatch -c FILENAME
