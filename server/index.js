const http = require("http")

const server = http.createServer((req, res) => {
    res.end("hell wrold vue")
})

server.listen(3000)