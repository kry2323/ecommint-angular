import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import * as compressionModule from 'compression';
import bootstrap from "./src/main.server";


// Cache storage
const CACHE_SIZE = 100;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes
const cache = new Map<string, { html: string, timestamp: number }>();


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ecommint/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use(compressionModule());

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({bootstrap}));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.use('*', (req, res, next) => {
    const url = req.originalUrl;
    console.log("err, no", url);
    console.log("err, no", cache.has(url));
    // Remove expired cache
    if (cache.has(url)) {
      const cached = cache.get(url);
      if (Date.now() - cached.timestamp > CACHE_EXPIRATION_TIME) {
        cache.delete(url);
      }
    }

    // Send cached response if exists
    if (cache.has(url)) {
      res.send(cache.get(url).html);
    } else {
      next();
    }
  });

// Render route
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]},
      (err, html) => {
        // Only cache successful render
        console.log(err);
        if (!err) {
          // If cache size reached limit, remove the oldest entry
          if (cache.size >= CACHE_SIZE) {
            const oldestKey = Array.from(cache.keys())[0];
            cache.delete(oldestKey);
          }
          console.log("err, no")
          cache.set(req.originalUrl, { html, timestamp: Date.now() });
        }

        res.send(html);
      }
    );
  });


  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
