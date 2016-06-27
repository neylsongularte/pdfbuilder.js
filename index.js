var connect = require('connect');
var serveStatic = require('serve-static')

connect()
    .use(serveStatic('./', {index: 'dev-playground/index.html'}))
    .listen(8000);

console.log('Listening on port 8000.');
