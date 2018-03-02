/* eslint-disable */
const request = require('supertest'),
  chai = require('chai'),
  app = require('./server.js'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

describe('Bookstore App', () => {
  describe('Admin Endpoints', () => {
    xit('should add admin', done => {
      let adminData = {
        firstName: 'Harry',
        lastName: 'Kane',
        email: 'harrykane@gmail.com',
        hash: 'harry'
      };
      request(app)
        .post('/api/v1/admin')
        .send(adminData)
        .set('Content-Type', 'Application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.firstName).to.equal(adminData.firstName);
          expect(res.body.lastName).to.equal(adminData.lastName);
          done();
        });
    });

    it('should fetch all admin data', done => {
      request(app)
        .get('/api/v1/admin')
        .expect('Content-Type', 'Application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          done();
        });
    });

    it('should delete admin data', done => {
      let data = {
        firstName: 'Kate',
        lastName: 'Winston',
        email: 'winstonkate@gmail.com',
        hash: 'kate'
      };
      request(app)
        .post('/api/v1/admin')
        .send(data)
        .set('Content-Type', 'Application/json')
        .expect(200)
        .end((err, res) => {
          let adminId = res.body._id;

          request(app)
            .delete('/api/v1/admin/' + adminId)
            .send(null)
            .expect(200)
            .end((err, res) => {
              expect(res.body._id).to.equal(adminId);
              expect(res.body.email).to.equal(data.email);
              done();
            });
        });
    });

    it('should test admin update endpoint', done => {
      let adminData = {
        firstName: 'Scot',
        lastName: 'Brown',
        email: 'brown@gmail.com',
        hash: 'kent'
      };

      request(app)
        .post('/api/v1/admin')
        .send(adminData)
        .set('Content-Type', 'Application/json')
        .expect(200)
        .end((err, res) => {
          let adminId = res.body._id,
            newAdminData = {
              firstName: 'Harry',
              lastName: 'Styles',
              email: 'harry@gmail.com',
              hash: 'harry'
            };

          request(app)
            .put('/api/v1/admin/' + adminId)
            .send(newAdminData)
            .set('Content-Type', 'Application/json')
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.firstName).to.equal(newAdminData.firstName);
              expect(res.body.lastName).to.equal(newAdminData.lastName);
              done();
            });
        });
    });
  });

  describe('Auth Endpoints', () => {
    xit('should test admin login', done => {
      let adminData = {
        email: 'harrykane@gmail.com',
        password: 'harry'
      };

      request(app)
        .post('/api/v1/auth')
        .send(adminData)
        .set('Content-Type', 'Application/json')
        .expect(200)
        .end((err, data) => {
          expect(data.body).to.be.an('object');
          expect(data.body.email).to.equal(adminData.email);
          expect(data.body).to.have.property('msg');
          done();
        });
    });
  });

  describe('Books Endpoints', () => {

    xit('should add books', (done) => {
      let book = {
        title: 'Intro to Laravel',
        author: 'Jerry King',
        price: 50,
        publicationDate: '2/3/2018',
        categoryId: 2,
        imagePath: 'uploads/intro-to-laravel'
      }

      request(app)
        .post('/api/v1/books')
        .send(book)
        .set('Content-Type', 'Application/json')
        .expect(200)
        .end((err, res) => {
          console.log(res.body);
          done();
        });
    });

    it('should get all books', (done) => {

      request(app)
        .get('/api/v1/books')
        .expect('Content-Type', 'Application/json')
        .expect(200)
        .end((err, res) => {
          
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          expect(res.body[0]).to.have.property('author');
          done();
        });
    });

    it('should delete book', (done) => {
      let book = {
        title: 'Integration Testing',
        author: 'Don Wilson',
        price: 40,
        publicationDate: '1/2/2018',
        categoryId: 4,
        imagePath: 'tests'
      }

      request(app)
        .post('/api/v1/books')
        .send(book)
        .set('Content-Type', 'Application/json')
        .expect(200)
        .end((err, res) => {
          let bookId = res.body._id;

          request(app)
            .delete('/api/v1/books' + bookId)
            .expect(200)
            .end((err, res) => {
              expect(res.body._id).to.equal(bookId);
              done();
            });
        });
    })
  });

});
