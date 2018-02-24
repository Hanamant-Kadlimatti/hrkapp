'use strict';

module.exports = function (app) {
  // Root routing
  var event = require('../controllers/events.server.controller');
    //  eventsPolicy = require('../policies/events.server.policy'),
  
  app.route('/api/events')
  .get(event.list)
  .post(event.create);

  app.route('/api/getEventByUser')
  .get(event.getEventByUser);

  //hanamant deleet events
  //  app.route('/api/events/:eventId').all(eventsPolicy.isAllowed)
  //   .get(events.read)
  //   .put(events.update)
  //   .delete(events.delete);
 // delete events end
};
