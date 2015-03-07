import config from './config/environment';
import GoodcityRouter from 'ember-goodcity/router/router';

var Router = GoodcityRouter.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('offer', { path: '/offers/:offer_id'}, function() {
    this.route('messages');
    this.route('donor_messages');
    this.route('supervisor_messages');

    this.resource('review_offer', function(){
      this.route('items');
      this.route('logistics');
      this.route('donor_details');
    });

    this.resource('review_item', {path: '/review_item/:item_id'},function() {
      this.route('index', { path: '/'});
      this.route('reject');
      this.route('accept');
      this.route('donor_messages');
      this.route('supervisor_messages');
    });
  });

  this.resource('item_types');
  this.route('packages');

  this.resource('offers', function(){
    this.route('submitted');
    this.route('under_review');
    this.route('reviewed');
    this.route('scheduled');
    this.route('closed');
    this.route('received');

    this.resource('my_list', function(){
      this.route('reviewing');
      this.route('reviewed');
      this.route('scheduled');
      this.route('finished');
    });
  });
});

export default Router;
