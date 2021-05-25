import Net from 'net'

const port = 7090;
const server = new Net.Server();

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()}`);
        setTimeout(() => {
          const msg = `${String.fromCharCode(62)}CD,0,1,10${String.fromCharCode(60)}`
          socket.write(msg)
          console.log(msg)
        }, 5000, 'Delay');

    });

    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
