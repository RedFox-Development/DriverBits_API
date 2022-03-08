
const {
  mongo,
  env,
  port
} = require('./src/tools/config');

const { log, warn, info, err} = require('./src/tools/console.js');

const createAPI = require('./src/graphql/api');

let express = require('express'),
  server = express(),
  PORT = port;
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const initBodyparser = () => {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
};

const initMongoose = () => {
  try {
    mongoose.connect(mongo);
    log('\n  SETUP: MongoDB Atlas: connected', true);
  } catch (e) {
    warn('\n  SETUP: MongoDB Atlas: connection failed', true);
  }
};

server.route('/')
  .get((req, res) => {
    server.use(express.static('build'));
    //res.sendFile(path.join(__dirname, '/build/index.html'));
    res.json({"content": "page root"});
  });

// server starting sequence

const startSequence = async () => {
  initBodyparser();
  initMongoose();
  const httpServer = http.createServer(server);
  const gAPI = createAPI(httpServer);
  await gAPI.start();
  gAPI.applyMiddleware({ app: server, path: ['/api', '/graphql'] });
  server.listen(PORT, () => console.log(`Server running on port ${PORT} in ${env} environment, listening....now?`));
};

startSequence();