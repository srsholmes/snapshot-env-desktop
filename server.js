const express = require('express');
const serveStatic = require('serve-static');

const PORT = 3000;
const server = path => {
  console.log('EXPRESS STATIC', path);
  const app = express();
  app.use(serveStatic(path));
  const appServer = app.listen(PORT);
  return {
    port: PORT,
    app: appServer,
  };
};

module.exports = {
  server,
};
