const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.locals.inventory = require('./inventory.js');
app.locals.orderHistory = [];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'DELETE')
  next();
});

app.get('/', (req, res) => {
  res.send('All the important words!');
});

app.get('/api/v1/inventory', (req, res) => {
  res.status(200).json(app.locals.inventory);
});

app.get('/api/v1/orderHistory', (req, res) => {
  res.status(200).json(app.locals.orderHistory);
});

app.post('/api/v1/orderHistory', (req, res) => {
  let orderHistoryArr = app.locals.orderHistory;
  let newOrderHistoryObj = req.body;
  orderHistoryArr.push(newOrderHistoryObj);
  app.locals.orderHistory = orderHistoryArr;
  res.status(201);
})

app.delete('/api/v1/orderHistory', (req, res) => {
  app.locals.orderHistory = [];
  res.status(200)
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
  })
}

module.exports = app;
