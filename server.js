const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', 3001);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.locals.inventory = [
  {invTitle: 'title1', invDescription: 'desc1', invImgURL: 'img1', invPrice: 'price1' },
  {invTitle: 'title3', invDescription: 'desc2', invImgURL: 'img2', invPrice: 'price2' },
]

app.get('/api/v1/inventory', (req, res) => {
  res.status(200).json(app.locals.inventory);
});


if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
  })
}

module.exports = app;
