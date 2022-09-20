const http = require("http")

const server = http.createServer((req, res) => {
    res.end("hell wrold vue,  222222222")
})

server.listen(4000)