const request = require('supertest');
const app = require('../server/index');
const schema = require('./helpers/schemaValidation');


describe('API TESTING', () => {
  describe('/:trailId/photos EndPoint', () => {
    test('JSON Object Returned', (done) => {
      request(app)
        .get('/3/photos')
        .expect('Content-Type', /json/, done);
    });

    test('\'200\' Status Returned', (done) => {
      request(app)
        .get('/3/photos')
        .expect(200, done);
    });

    test('Data Shape Is Correct', (done) => {
      request(app)
        .get('/4/photos')
        .then(response => {
          expect(schema.schemaValidation(schema.photosSchema, response.body)).toBe(true);
          done();
        });
    });
  });

  describe('/:trailId/heroPhoto EndPoint', () => {
    test('JSON Object Returned', (done) => {
      request(app)
        .get('/3/heroPhoto')
        .expect('Content-Type', /json/, done);
    });

    test('\'200\' Status Returned', (done) => {
      request(app)
        .get('/3/heroPhoto')
        .expect(200, done);
    });

    test('Data Shape Is Correct', (done) => {
      request(app)
        .get('/3/heroPhoto')
        .then(response => {
          expect(schema.schemaValidation(schema.heroPhotosSchema, response.body)).toBe(true);
          done();
        });
    });
  });

  describe('/:trailId/photosCount EndPoint', () => {
    test('JSON Object Returned', (done) => {
      request(app)
        .get('/3/photosCount')
        .expect('Content-Type', /json/, done);
    });

    test('\'200\' Status Returned', (done) => {
      request(app)
        .get('/3/photosCount')
        .expect(200, done);
    });

    test('Data Shape Is Correct', (done) => {
      request(app)
        .get('/3/photosCount')
        .then(response => {
          expect(schema.schemaValidation(schema.photosCountSchema, response.body)).toBe(true);
          done();
        });
    });
  });
});
