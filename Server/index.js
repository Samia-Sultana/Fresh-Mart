const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectID;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/uploads',express.static('uploads'));
require('dotenv').config({ path: '../.env' })

var storage  = multer.diskStorage({
  destination: function(request, file, callback){
    callback(null, 'uploads/')
  },
  filename: function(request, file, callback){
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u9qe8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_1}`);
  const orderCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_2}`);
  console.log('database connected');
  app.post('/addProduct', upload.single('photo'), (req,res)=>{
    const product = {
      name: req.body.name,
      weight: req.body.weight,
      price: req.body.price,
      photo: 'http://localhost:4200/' + req.file.path
    }
    productCollection.insertOne(product); 
  })
  
  app.get('/getAllProduct',async (req,res)=>{
    const documents = productCollection.find({});
    const result = await documents.toArray();
    res.send(result);  
  })

  app.get('/get12Product',async (req,res)=>{
    const documents = productCollection.find({});
    const result = await documents.toArray();
    res.send(result);  
  })

  app.post('/placeOrder',async (req,res)=>{
    const result = orderCollection.insertOne(req.body);
    res.send(await result);
  })

  app.get('/allOrder/:email', async (req,res)=>{
    const email = req.params.email;
    const documents = orderCollection.find({'email': email});
    const result = await documents.toArray();
    res.send(result);
  })
  
  app.get('/delete/:productId', async (req,res)=>{
    const result = productCollection.deleteOne({'_id': ObjectId( req.params.productId)});
    res.send(await result);
  })
 
  
});

app.listen(4200, () => console.log('this server is running on port 4200'));