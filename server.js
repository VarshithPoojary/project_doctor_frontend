
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require("fs");


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
    // key: fs.readFileSync("./key.crt"),
    // cert: fs.readFileSync("./cert.crt"),
  };
  

  app.prepare().then(() => {
    createServer( (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3242,'0.0.0.0', (err) => {
      if (err) throw err;
      console.log("> Server started on 3242");
    });
  });