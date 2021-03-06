import config from './config/environment';
import GoodcityRouter from 'shared-goodcity/router/router';
import googlePageview from './mixins/google-pageview';

const Router = GoodcityRouter.extend(googlePageview, {
  location: config.locationType
});

Router.map(function() {
  this.resource('offer', { path: '/offers/:offer_id'}, function() {
    this.route('messages');
    this.route('donor_messages');
    this.route('supervisor_messages');
    this.route('merge');

    this.route('plan_delivery');
    this.route('collection_charges');
    this.route('gogovan_charges');
    this.route('cancel_gogovan');

    this.resource('item', {path: '/items/:item_id'}, function() {
      this.route('edit_images');
    });

    this.resource('review_offer', function(){
      this.route('items');
      this.route('logistics');
      this.route('donor_details');
      this.route('receive');
    });

    this.resource('receive_package', {path: '/receive_package/:package_id'});

    this.resource('review_item', {path: '/review_item/:item_id'},function() {
      this.route('index', { path: '/'});
      this.route('reject');
      this.route('accept');
      this.route('donor_messages');
      this.route('supervisor_messages');
    });

    this.resource('package', {path:'/package/:package_id'}, function() {
      this.route('edit_images');
    });

    this.resource('delivery', { path: '/delivery/:delivery_id'}, function(){
      this.route('book_timeslot');
      this.route('available_time_slots');
      this.route('contact_details');
      this.route('thank_offer');

      this.route('book_van');
      this.route('confirm_van');
      this.route('porterage_charges');

      this.route('drop_off_schedule');

      this.route('cancel_booking');
    });
  });

  this.resource('item_types');
  this.route('packages');
  this.route('my_notifications');
  this.route('search');

  this.resource('offers', function(){
    this.route('submitted');
    this.route('receiving');

    this.resource('my_list', function(){
      this.route('reviewing');
      this.route('reviewed');
      this.route('scheduled');
      this.route('finished');
    });

    this.resource('in_progress', function(){
      this.route('reviewing');
      this.route('reviewed');
    });

    this.resource('finished', function(){
      this.route('received');
      this.route('cancelled');
      this.route('inactive');
    });

    this.resource('scheduled', function(){
      this.route('collection');
      this.route('gogovan');
      this.route('other_delivery');
    });
  });

  this.resource('users');
  this.resource('user', { path: '/users/:user_id'});
});

export default Router;
