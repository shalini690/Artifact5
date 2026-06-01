'use strict';

/**
 * server.js
 * -----------------------------------------------------------------------------
 * Express.js application entry point for the Artifact5 tutorial server.
 *
 * This single-file Node.js HTTP server is built on the Express.js framework
 * (the project's sole runtime dependency) and exposes exactly two plain-text
 * `GET` endpoints:
 *
 *   - GET /              -> "Hello world"   (the original tutorial response,
 *                                            preserved and now served through
 *                                            Express for backward compatibility)
 *   - GET /good-evening  -> "Good evening"  (the newly added endpoint)
 *
 * The server binds a network listener on `process.env.PORT` when provided,
 * falling back to port 3000 (the conventional Express tutorial default).
 *
 * Module system: CommonJS (`require`) — consistent with package.json, which
 * does not declare `"type": "module"`.
 *
 * Runtime: Node.js >= 18 (the Express 5 runtime floor). No build or transpile
 * step is required.
 *
 * Referenced by package.json: `main` = "server.js" and `scripts.start` =
 * "node server.js" (i.e. `npm start`).
 * -----------------------------------------------------------------------------
 */

// Import the Express framework. `express` is a factory function that, when
// invoked, returns an application instance. It is declared as a runtime
// dependency (`express: ^5.2.1`) in package.json and installed into
// node_modules/ by `npm install`.
const express = require('express');

// Instantiate the Express application. The returned `app` object provides the
// routing API (`app.get`, `app.post`, ...) and the `app.listen` helper, which
// internally creates and returns a Node.js `http.Server`.
const app = express();

// Disable the `X-Powered-By: Express` response header. Express enables this
// app setting by default, advertising the framework on every response, which
// discloses an internal implementation detail to clients and aids
// fingerprinting. Disabling it follows Express' official security guidance and
// removes the header from all responses. This is a built-in app setting — it
// adds no middleware, routes, modules, or dependencies, preserving the
// project's minimal footprint.
app.disable('x-powered-by');

/**
 * GET /
 *
 * Responds with the exact plain-text body "Hello world".
 *
 * This is the original tutorial endpoint, preserved verbatim and now served
 * through Express to satisfy the backward-compatibility requirement. Express'
 * `res.send` sends the string with HTTP status 200.
 */
app.get('/', (req, res) => {
  res.send('Hello world');
});

/**
 * GET /good-evening
 *
 * Responds with the exact plain-text body "Good evening".
 *
 * This is the new endpoint introduced by this feature. As with the root route,
 * `res.send` returns the string with HTTP status 200.
 */
app.get('/good-evening', (req, res) => {
  res.send('Good evening');
});

// Resolve the listening port from the environment, defaulting to 3000 when the
// PORT environment variable is not set. This keeps the server configurable in
// hosted environments while requiring zero configuration for local tutorial use.
const PORT = process.env.PORT || 3000;

// Bind the network listener and emit a single informative startup log line once
// the server is ready to accept connections.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Export the configured Express application. This is optional for running the
// server (the listener above is what serves requests) but enables the `app` to
// be imported by test harnesses or other tooling without binding a port.
module.exports = app;
