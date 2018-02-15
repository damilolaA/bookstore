const request = require('supertest'),
    chai = require('chai'),
    app = require('./server.js'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('Admin Endpoints', () => {
    it('should add admin', function(next) {
        let adminData = {
            firstName: 'Puff',
            lastName: 'Daddy',
            email: 'seancombs@gmail.com',
            hash: 'puff'
        };
        request(app)
            .post('/api/v1/admin')
            .send(adminData)
            .set('Content-Type', 'Application/json')
            .expect(200)
            .end(function(err, res) {
                console.log(res.body);
                expect(res.body).to.be.an('object');
                next();
            });
    });

    it('should fetch all admin data', function(done) {
        request(app)
            .get('/api/v1/admin')
            .expect('Content-Type', 'Application/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.be.an('array');
                done();
            });
    });
});
