mdwatch
=======

`mdwatch` is a tool to help you preview markdown documents. It will watch the file for changes and automatically serve the updated content in your browser.

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
 
License
-------

[MIT License](http://www.opensource.org/licenses/mit-license.php)

&copy; 2011-2012 Xueqiao Xu &lt;xueqiaoxu@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
