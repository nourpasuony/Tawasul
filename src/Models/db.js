import { connect } from 'mongoose';
connect('mongodb://127.0.0.1:27017/akhate')
  .then(() => console.log('db is Connected'));