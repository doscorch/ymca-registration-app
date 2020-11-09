const { Service } = require('feathers-mongodb');

exports.Enrollments = class Enrollments extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('enrollments');
    });
  }
};
