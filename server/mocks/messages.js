module.exports = function(app) {
  var express = require('express');
  var messagesRouter = express.Router();

  var messages_json = {
    "messages": [
      {"id":1,"body":"example1", "state": "read"},
      {"id":2,"body":"example2", "state": "read"},
      {"id":3,"body":"example3", "state": "read"},
      {"id":5,"body":"Current thread message", "state": "read"}
    ]
  };

  messagesRouter.get('/', function(req, res) {
    res.send({"messages": []});
  });

  messagesRouter.put("/:id/mark_read", function(req, res) {
    res.send(messages_json);
  });

  messagesRouter.post('/', function(req, res) {
    res.send({ 'message': {"id":1,"body":"example4", "state": "read"}});
  });

  app.use('/api/v1/messages', messagesRouter);
};
