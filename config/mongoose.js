const mongoose = require('mongoose');
const logger = require('./logger.js');
const { mongo, env } = require('./vars.js');

const migration = require('../lib/migration.lib');

mongoose.Promise = Promise;

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
    mongoose.set('debug', true);
  }

  
/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
    mongoose
      .connect(mongo.uri, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        console.log('mongoDB connected...')
        
        await migration.migratePermissions();
        await migration.migrateRoles();
        await migration.migrateUsers(); 
        
      });
    return mongoose.connection;
  };
  
