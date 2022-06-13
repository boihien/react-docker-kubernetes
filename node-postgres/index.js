const { response } = require('express')

const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

const { Pool } = require('pg')
//const app = express()
const port = 3001

const products_model=require('./products_model')

app.use(express.json())
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
  products_model.getProducts()
  .then(response=>{
      res.status(200).send(response);
  })
  .catch(error=>{
      res.status(500).send(error);
  })
});

app.post('/products', (req, res) => {
  products_model.createProducts(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});