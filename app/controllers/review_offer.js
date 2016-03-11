import Ember from 'ember';

export default Ember.Controller.extend({

  application: Ember.inject.controller(),
  offer: Ember.computed.alias('model'),
  isStartReviewClicked: false,
  i18n: Ember.inject.service(),
  messageBox: Ember.inject.service(),

  displayOfferOptions: Ember.computed({
    get: function() {
      return false;
    },
    set: function(key, value) {
      return value;
    }
  }),

  isMyOffer: Ember.computed('offer.reviewedBy', {
    get: function() {
      var currentUserId = this.session.get("currentUser.id");
      return this.get("offer.reviewedBy.id") === currentUserId;
    },
    set: function(key, value) {
      return value;
    }
  }),

  cancelByMe: Ember.computed('model', {
    get() {
      return false;
    },
    set(key, value) {
      return value;
    }
  }),

  isOfferVanished: Ember.computed.or('offer.isDeleted', 'offer.isDeleting'),

  showDeleteError: Ember.observer('offer', 'isOfferVanished', function(){
    var currentPath = window.location.href;

    if(this.get("isOfferVanished") && !this.get("cancelByMe")) {
      if(currentPath.indexOf("review_item") < 0 && currentPath.indexOf(`offers/${this.get("offer.id")}`) >= 0) {
        this.get("messageBox").alert(this.get("i18n").t("404_error"), () => {
          this.transitionTo("my_list");
        });
      }
    }
  }),


  backLinkPath: Ember.computed('offer.state', 'isMyOffer', function(){
    var offer = this.get("offer");
    var isMyOffer = this.get("isMyOffer");

    if(offer.get("isSubmitted")) { return "offers"; }
    else if(offer.get("isReceiving")) { return "offers.receiving"; }
    else if(offer.get("isReviewed")) {
      return isMyOffer ? "my_list.reviewed" : "in_progress.reviewed"; }
    else if(offer.get("isUnderReview")) {
      return isMyOffer ? "my_list.reviewing" : "in_progress.reviewing"; }
    else if(offer.get("isClosed") || offer.get("isCancelled")) {
      return isMyOffer ? "my_list.finished" : "finished.cancelled"; }
    else if(offer.get("isReceived")) {
      return isMyOffer ? "my_list.finished" : "finished.received"; }
    else if(offer.get("isInactive")) {
      return isMyOffer ? "my_list.finished" : "finished.inactive"; }
    else if(offer.get("isScheduled")) {
      if(isMyOffer) { return "my_list.scheduled"; }
      else if(offer.get("delivery.isGogovan")) { return "scheduled.gogovan"; }
      else if(offer.get("delivery.isDropOff")) { return "scheduled.other_delivery"; }
      else if(offer.get("delivery.isAlternate")) { return "scheduled.collection"; }
    else { return "offers"; }
    }
  }),

  offerReadyForClosure: Ember.computed("model.state", "model.packages.@each.state", function(){
    return !this.get("model.allItemsRejected") &&
      this.get("model.allItemsReviewed") &&
      this.get("model.state") !== "received" &&
      this.get("model.packages.length") > 0 &&
      this.get("model.packages").filter(p => !p.get("item.isRejected") && p.get("state") === "expecting").get("length") === 0;
  }),

  actions: {
    toggleOfferOptions() {
      this.toggleProperty("displayOfferOptions");
    },

    addItem() {
      var draftItemId = this.get("model.items").filterBy("state", "draft").get("firstObject.id") || "new";
      this.transitionToRoute('item.edit_images', draftItemId);
    },

    startReview() {
      if(this.get("isStartReviewClicked")) { return; }
      var offer = this.store.peekRecord('offer', this.get('offer.id'));
      this.set("isStartReviewClicked", true);
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('offer', offer.get('id')) + '/review';

      adapter.ajax(url, 'PUT')
        .then(data => this.store.pushPayload(data))
        .finally(() => this.set("isStartReviewClicked", false));
    },

    cancelOffer() {
      this.send("toggleOfferOptions");
      var offer = this.get("model");
      this.get("messageBox").confirm(this.get("i18n").t("delete_confirm"), () => {
        this.set("cancelByMe", true);
        var loadingView = this.container.lookup('component:loading').append();
        offer.deleteRecord();
        offer.save()
          .then(() => {
            this.transitionToRoute(this.get("backLinkPath"));
          })
          .catch(error => { offer.rollback(); throw error; })
          .finally(() => {loadingView.destroy(); this.set("cancelByMe", false);});
        });
    },

    submitOffer() {
      this.toggleProperty("displayOfferOptions");
      var loadingView = this.container.lookup('component:loading').append();
      var offer = this.get("model");
      offer.setProperties({ state_event: 'submit' });

      offer.save()
        .finally(() => loadingView.destroy());
    }
  }
});
