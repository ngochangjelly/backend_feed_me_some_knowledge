import MongoClient from 'mongodb';
import mongoose from 'mongoose';

const uri =
  'mongodb+srv://ftu2sharingdb:$Jkns9ev.BRS_-6@cluster0-ypfb1.mongodb.net/test?retryWrites=true&w=majority';


function initialize(
  dbName,
  dbCollectionName,
  successCallback,
  failureCallback
) {
  MongoClient.connect(uri, function (err, dbInstance) {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err);
    } else {
      const dbObject = dbInstance.db(dbName);
      const dbCollection = dbObject.collection(dbCollectionName);
      successCallback(dbCollection);
    }
  });
}


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

async function insertRecord({ content = '', displayed = true, url = "google.com" }) {
  connectMongoose();
  const newRecord = new Article({
    content,
    updatedAt: new Date(),
    displayed,
    url
  });

  const response = await newRecord.save()
  mongoose.connection.close();
};

async function getRecords() {
  const db = await connectMongoose();

  db.once('open', function () {
    const articles = mongoose.model('articles', articleSchema, 'articles');
    const res = articles.find({})
    console.log("getRecords -> res", res.data)
  });

}

export { insertRecord, getRecords, initialize }
