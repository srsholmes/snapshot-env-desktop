const express = require('express');
const serveStatic = require('serve-static');
// const ngrok = require('ngrok');

const PORT = 3000;

const server = async path => {
  const app = express();
  app.use(serveStatic(path));

  const appServer = app.listen(PORT);
  // console.log('BEFORE NGROK');
  //
  // const url = await ngrok.connect({
  //   addr: 8080,
  // });

  return {
    port: PORT,
    app: appServer,
    ngrok: {
      ngrok: 'ngrokserver',
      url: 'ngrok Url here...',
    },
  };
};

module.exports = {
  server,
};
