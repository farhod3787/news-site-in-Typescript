import config from "./config";
import { App } from './Applications';
import * as mongoose from 'mongoose';

mongoose.connect(
  config.development.mongoDburi, {}
).then( () => {
  const server = App.listen(config.development.port);
  server.on('listening', () => {
    console.log('Server listening');
  });
})
