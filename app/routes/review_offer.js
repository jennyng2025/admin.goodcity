import Ember from 'ember';
import AuthorizeRoute from './authorize';
import './../computed/local-storage';

export default AuthorizeRoute.extend({
  fromMyListPage: Ember.computed.localStorage(),

  beforeModel() {
    var previousRoutes = this.router.router.currentHandlerInfos;
    var previousRoute = previousRoutes && previousRoutes.pop();

    if(previousRoute){
      var parentRoute = previousRoutes[1];
      var hasParentRoute = parentRoute && parentRoute.name === "offers";
      var isSearchRoute = previousRoute.name === "search";
      var isFromMyListPage = previousRoute.name.indexOf("my_list") > -1;

      if(!isSearchRoute && hasParentRoute) {
        this.set("fromMyListPage", isFromMyListPage);
      }
    }
  },

  model() {
    var offerId = this.modelFor('offer').get('id');
    return this.store.findRecord('offer', offerId);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set("displayOfferOptions", false);
    if(this.get('fromMyListPage') !== null) {
      controller.set('isMyOffer', this.get('fromMyListPage'));
    }
  }
});

