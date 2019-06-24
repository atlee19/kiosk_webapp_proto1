const WebSocketClient = require('websocket').client
const ArgumentParser = require('argparse').ArgumentParser
const fs = require('fs')


function log(message) {
  console.log(`${new Date()} ${message}`)
}

class EventReader {
  constructor(file) {
    this.buffer = fs.readFileSync(file)
    this.offset = 0
  }

  readNext() {
    if (this.offset >= this.buffer.length) {
      return [0, undefined]
    }
    let relativeTimeInMs = this.buffer.readUInt32BE(this.offset + 0)
    let messageLengthInBytes = this.buffer.readUInt32BE(this.offset + 4)
    let binaryData = this.buffer.slice(this.offset + 8, this.offset + 8 + messageLengthInBytes)
    this.offset += 8 + messageLengthInBytes
    return [relativeTimeInMs, binaryData]
  }
}

class Player {
  constructor(ip_address, event_file) {
    log(`Connecting to ${args.ip_address}`)
    this.client = new WebSocketClient()
    this.client.connect(`ws://${ip_address}:8080/`)

    log(`Reading file: ${event_file}`)
    this.eventReader = new EventReader(event_file)

    this.client.on('connectFailed', function(error) {
      log('Connect Error: ' + error.toString())
    })

    this.client.on('connect', (connection) => {
      log('WebSocket Client Connected')

      connection.on('error', (error) => {
        log("Connection Error: " + error.toString())
      })
      connection.on('close', () => {
        log('Connection Closed')
      })

      this._fireNextEvent(connection)
    })
  }

  _fireNextEvent(connection) {
    let [relativeTimeInMs, binaryData] = this.eventReader.readNext()
    if (binaryData === undefined) {
      log(`End of Messages`)
      connection.close()
    } else {
      setTimeout(() => {
        log(`Writing Message (${binaryData.length} bytes.)`)
        connection.send(binaryData)
        this._fireNextEvent(connection)
      }, relativeTimeInMs)
    }
  }
}


var parser = new ArgumentParser({
  version: '1.0.0',
  addHelp:true,
  description: 'A simple event recorder'
})
parser.addArgument(
  [ '-i', '--ip-address' ],
  {
    help: 'The ip address of the recognizer to record.'
  }
)
parser.addArgument(
  [ '-e', '--event-file' ],
  {
    help: 'A file to read event messages from.'
  }
)

var args = parser.parseArgs()
player = new Player(args.ip_address, args.event_file)
