const express = require('express');
const serveStatic = require('serve-static');

const PORT = 3000;
const server = path => {
  console.log('EXPRESS STATIC', path);
  const app = express();
  app.use(serveStatic(path));
  app.listen(PORT);
  return PORT;
};

module.exports = {
  server
};
