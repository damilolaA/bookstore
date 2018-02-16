const request = require('supertest'),
    chai = require('chai'),
    app = require('./server.js'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('Admin Endpoints', () => {
    xit('should add admin', function(next) {
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
            .end(function(err, res) {
                expect(res.body).to.be.an('object');
                expect(res.body.firstName).to.equal(adminData.firstName);
                expect(res.body.lastName).to.equal(adminData.lastName);
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
                expect(res.body[0]).to.be.an("object");
                done();
            });
    });

    it('should delete admin data', (done) => {
        let data = {
            firstName: 'Kate',
            lastName: 'Winston',
            email: 'winstonkate@gmail.com',
            hash: 'kate'
        }
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
                        console.log(res.body);
                        expect(res.body._id).to.equal(adminId)
                        expect(res.body.email).to.equal(data.email)
                        done()
                    })
            })
    })
});
