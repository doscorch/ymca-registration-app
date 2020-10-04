const { Service } = require('feathers-mongodb');

exports.Programs = class Programs extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('programs');
    });
  }
};
