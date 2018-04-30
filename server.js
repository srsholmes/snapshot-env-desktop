const express = require('express');
const serveStatic = require('serve-static');
const ngrok = require('ngrok');

const PORT = 3000;

const server = async path => {
  const app = express();
  app.use(serveStatic(path));

  const appServer = app.listen(PORT);
  console.log('BEFORE NGROK')
  const url = await ngrok.connect({
    addr: 4000,
    region: 'eu',
    binPath: x => {
      console.log('AAAAAAAAAAA')
      console.log({ x })
      return x.replace('/bin', '.unpacked/bin'),
    } // custom binary path, eg for prod in electron
  });

  console.log({ url });
  return {
    port: PORT,
    app: appServer,
    ngrok: {
      ngrok,
      url,
    },
  };
};

module.exports = {
  server,
};
