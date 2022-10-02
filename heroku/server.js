const WebSocketServer = require("ws").Server
const http = require("http")
const express = require("express")
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

const server = http.createServer(app)
server.listen(port)

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

console.log("http server listening on %d", port)

const wss = new WebSocketServer({ server: server })
console.log("websocket server created")

wss.on("connection", function (ws) {
    var id = setInterval(function () {
        ws.send(JSON.stringify(new Date()), function () { })
    }, 1000)

    console.log("websocket connection open")

    ws.on("close", function () {
        console.log("websocket connection close")
        clearInterval(id)
    })
})