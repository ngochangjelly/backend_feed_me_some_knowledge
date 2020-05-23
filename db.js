import MongoClient from 'mongodb';
import mongoose from 'mongoose';

const uri =
  'mongodb+srv://ftu2sharingdb:$Jkns9ev.BRS_-6@cluster0-ypfb1.mongodb.net/test?retryWrites=true&w=majority';

const connectMongoose = () => {
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};
const articleSchema = new mongoose.Schema({
  content: String,
  updatedAt: Date,
  displayed: Boolean,
  url: String
});

const Article = mongoose.model('Article', articleSchema);

  function insertRecord({ content='', displayed, url }) {
    connectMongoose();
    const newRecord = new Article({
      content,
      updatedAt: new Date(),
      displayed,
      url
    });

    newRecord.save().then(response => {
      console.log('article saved!');
      mongoose.connection.close();
    });
  };

  async function getRecords() {
    const db = await connectMongoose();
    console.log('aaaaaa',db)
  }

  export {insertRecord, getRecords}