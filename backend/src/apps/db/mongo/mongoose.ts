import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config';

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clustergame.safci.mongodb.net/
  ${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  () => {}
);

const db = mongoose.connection;

db.on('connecting', function () {
  console.log('Connecting to ', uri);
});
db.on('connected', function () {
  console.log('Connected to ', uri);
});
db.on('disconnecting', function () {
  console.log('Disconnecting from ', uri);
});
db.on('disconnected', function () {
  console.log('Disconnected from ', uri);
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to MongoDB database!');
});

export { db as MongoDB };
