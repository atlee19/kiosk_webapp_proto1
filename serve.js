var WebSocketServer = require('websocket').server;
var http = require('http');

const webSocketsServerPort = 8080

function log(message) {
  console.log(`${new Date()} ${message}`)
}

var server = http.createServer(function(request, response) {
  /* empty */
})
server.listen(webSocketsServerPort, function() {
  log(`Server is listening on port ${webSocketsServerPort}`)
})

wsServer = new WebSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
})

var clients = []

wsServer.on('request', function(request) {
  log(`Connection from origin ${request.origin}.`)

  var connection = request.accept(null, request.origin)

  clients.push(connection)

  connection.on('message', function(message) {
    if (message.type === 'binary') {
      for (var i = 0, iMax = clients.length; i < iMax; i++) {
        if (clients[i] !== connection) {
          clients[i].send(message.binaryData)
        }
      }
    }
  })

  connection.on('close', function(connection) {
    log('Client disconnected')

    let index = clients.indexOf(connection)
    if (index < 0) {
      return
    }
    clients = clients.filter((x) => { return x !== connection })
  })
})
