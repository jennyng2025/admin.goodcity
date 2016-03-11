import Ember from 'ember';
import startApp from '../helpers/start-app';
import syncDataStub from '../helpers/empty-sync-data-stub';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';

var App;

module('Subscriptions', {
  setup: function() {
    App = startApp();
    TestHelper.setup();
    syncDataStub(TestHelper);
  },
  teardown: function() {
    Em.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test("updateStore doesn't process before response to model.save request", function() {
  expect(2);

  var store = FactoryGuy.store;
  var subscriptions = lookup('controller:subscriptions');
  var user = FactoryGuy.make('user');
  FactoryGuy.make('user_profile', {id:user.id});
  var offer = {id:2};

  $.mockjaxSettings.logging = true;
  $.mockjax({url:"/api/v1/offer*",status:201,response: function(){
    Ember.run(function() {
      subscriptions.update_store({
        item: {"offer":offer},
        sender: {"user":user.toJSON({includeId:true})},
        operation: "create"
      }, function(){});
    });
    this.responseText = {"offer":offer};
  }});

  Ember.run(function() {
    store.createRecord("offer",{createdBy:user}).save().then(function() {
      equal(store.peekAll("offer").get("length"), 1);
      equal(store.peekAll("offer").get("firstObject.id"), offer.id);
    });
  });

  // causes test to wait for next ember run loop before completing
  andThen(function() { });
});
