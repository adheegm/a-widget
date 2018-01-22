//Install express server
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname + '/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

const port = process.env.PORT || '8080';
app.set('port', port);

// Start the app by listening on the default Heroku port
//app.listen(process.env.PORT || 8080);

const server = http.createServer(app);

server.listen(port, () => console.log('Running'));