
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
server.route('/reg')
  .get((req, res) => {
    let record;
    console.warn(req.query);
    getAuth()
      .createUser({
        email: req.query.email,
        emailVerified: true,
        phoneNumber: req.query.phone,
        password: 'default',
        displayName: req.query.name,
        photoURL: 'https://external-preview.redd.it/tYjmAjGjvXE8Ifdm_S31v9ncXUlwRZlya4Um8t0jaj8.png?auto=webp&s=5134ee52e9809b560a443d865fb7a1b98a4d8aa2',
        disabled: false,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        record = userRecord;
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
      });
    res.send(record);
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