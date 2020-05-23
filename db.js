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

async function insertRecord({ content = '', displayed = true, url = "google.com" }) {
  connectMongoose();
  const newRecord = new Article({
    content,
    updatedAt: new Date(),
    displayed,
    url
  });

  const response = await newRecord.save()
  console.log(response)
  mongoose.connection.close();
};
insertRecord({ content: 'as', displayed: true, url: 'assss' })

async function getRecords() {
  const db = await connectMongoose();
  console.log("getRecords -> db", db.data)
}

export { insertRecord, getRecords }