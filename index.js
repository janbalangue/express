// Express application
import express from 'express';
import compression from 'compression';

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

// configuration
const
    __dirname = dirname(fileURLToPath( import.meta.url )) + sep,
    cfg = {
        port: process.env.PORT || 3000,
        dir: {
            root: __dirname,
            static: __dirname + 'static' + sep
        }
    };

console.dir(cfg, { depth: null, color: true });
    
// Express initiation
const app = express();

// do not identify express
app.disable('x-powered-by');

// HTTP compression
app.use( compression() );

app.use((req, res, next) => {
    console.log(req.url);
    next();
}); 

// home page route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// serve static assets
app.use(express.static( cfg.dir.static ));

// start server
app.listen(cfg.port, () => {
    console.log(`Example app listening at http://localhost:${ cfg.port }`);
});

export { cfg, app };