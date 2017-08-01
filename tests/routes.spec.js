process.env.NODE_ENV = 'testing';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return a homepage with text', done => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.html;
      res.res.text.should.equal('All the important words!');
      done();
    });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/sadtimes')
    .end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });

});

describe('API Routes', () => {

  describe('GET /api/v1/inventory', () => {
    it('should return all of the inventory', done => {
      chai.request(server)
      .get('/api/v1/inventory')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(6);
        res.body[0].invPrice.should.equal('2999');
        done();
      });
    });

    it('should return 404 with incorrect url', done => {
      chai.request(server)
      .get('/api/v1/inventoryy')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.html;
        done();
      });
    });

  });

  describe('GET /api/v1/orderHistory', () => {
    it('should return all of the order history', done => {
      chai.request(server)
      .get('/api/v1/orderHistory')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
    });

    it('should return 404 with incorrect url', done => {
      chai.request(server)
      .get('/api/v1/orderHistoryy')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.html;
        done();
      });
    });

  });
  describe('POST /api/v1/orderHistory', () => {

    let orderBody = {totalCost: "$49.94", dateOrdered: "07/27/2017, 5:10 pm"}

    it('should return 201', done => {
      chai.request(server)
      .post('/api/v1/orderHistory')
      .send(orderBody)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        chai.request(server)
        done()
      });
    });

    let orderBody2 = {totalCost: "$49.94"}

    it('should return 422', done => {
      chai.request(server)
      .post('/api/v1/orderHistory')
      .send(orderBody2)
      .end((err, res) => {
        res.should.have.status(422);
        res.should.be.json;
        res.body.error.should.equal('include valid values in the body of your post request');
        chai.request(server)
        done()
      });
    });
  });

});
