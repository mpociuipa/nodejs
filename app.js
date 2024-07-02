const fs = require('fs');
const http = require('http');
const url = require('url');
const syHello = require('./modules/syHello')
// Nuskaityti failo turin
let products = fs.readFileSync('./data/new.txt', 'utf-8');
products = JSON.parse(products);


// // Padalinti turinį į žodžius
// const words = text.split(/\s+/); // naudoja bet kokį baltą tarpą kaip skyriklį

// // Filtruoti žodžius, kurie ilgesni nei 6 raidės
// const longWords = words.filter(word => word.length > 6);

// // Paversti filtruotus žodžius į vieną eilutę, atskirtą tarpais ar naujomis eilutėmis
// const resultText = longWords.join(' ');

// // Įrašyti filtruotus žodžius į result.txt failą
// fs.writeFileSync('./data/result.txt', resultText);

//sukurti serveri

const server = http.createServer((req, res)=>{
    // res.writeHead(200,{'Content-Type':'text/html'})
    // res.end("T<h1>his is home page</h1>");
    // res.writeHead(200,{'Content-Type':'application/json'})
    // res.end(JSON.stringify(text))

    const {pathname, query} = url.parse(req.url, true);
    switch(pathname){
        case '/':
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(JSON.stringify(products));
        break;
    case '/api/products':
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(products[query.id]));
        break;
    case '/api/product/search':
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(findProductByNmae(products,query.name)));
        break;

        default:
            res.writeHead(404,{'Content-Type':'text/html'})
            res.end("<h1>404 Not Found</h1>")
    }
})

server.listen(8000, '127.0.0.1',()=>{
    console.log('Server listening om 8000 port')
})