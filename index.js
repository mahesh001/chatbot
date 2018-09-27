const express = require('express');
const http = require('http');

const app = express();
app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images
var server = http.createServer(app);
server = server.listen(5000);
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const apiai = require('apiai')('a3be451ec2dd4e3c8b5d1895ff1ed8e9  ');
const io = require('socket.io')(server);


io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
  //console.log(socket);

    // Get a reply from API.AI

    let apiaiReq = apiai.textRequest(text, {
      sessionId: socket.id
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log(aiText);
      socket.emit('bot reply', aiText); // Send the result back to the browser!
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});