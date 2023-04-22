const http = require('http')

const requestLiestener = (request, response) => {
    response.setHeader('Content-Type', 'text/html')
    response.statusCode = 200

    const { method } = request
    if (method === 'GET') {
        response.end('<h1>Ini adalah method GET</h1>')
    }
    if (method === 'POST') {
        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk)
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            response.end(`<h1>Hai, ${name}!</h1>`)
        });

        // response.end('<h1>Ini adalah method POST</h1>')

    }
    // if(method === 'PUT'){
    //     response.end('<h1>Ini adalah method PUT</h1>')
    // }
    // if(method === 'DELETE'){
    //     response.end('<h1>Ini adalah method DELETE</h1>')
    // }
}

const server = http.createServer(requestLiestener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`)
})