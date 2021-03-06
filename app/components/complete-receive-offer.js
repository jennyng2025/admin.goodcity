import Ember from 'ember';
import AjaxPromise from 'goodcity/utils/ajax-promise';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  i18n: Ember.inject.service(),

  invalidMessage: Ember.computed({
    get() {
      return false;
    },
    set(key, value) {
      return value;
    }
  }),

  closeMessage: Ember.computed("offer.allPackagesMissing", {
    get() {
      var offer = this.get("offer");
      if(offer.get("allPackagesMissing")) {
        return this.get("i18n").t("review_offer.missing_offer_message").string;
      } else {
        return this.get("i18n").t("review_offer.receive_offer_message").string;
      }
    },
    set(key, value) {
      return value;
    }
  }),

  actions: {

    confirmCloseOffer() {
      this.confirmCloseOffer(() => this.send("closeOffer"));
    },

    closeOffer() {
      var closeOfferMessage = this.get("closeMessage") || "";

      if(closeOfferMessage.trim().length === 0) {
        this.set("invalidMessage", true);
        return false;
      }

      this.set("invalidMessage", false);

      var loadingView = this.container.lookup('component:loading').append();
      var offerId = this.get('offer.id');

      var url = "/offers/" + offerId + "/receive_offer";

      new AjaxPromise(url, "PUT", this.get('session.authToken'), { close_offer_message: closeOfferMessage })
        .then(data => {
          this.get("store").pushPayload(data);
        })
        .finally(() => {
          this.closeConfirmBox();
          loadingView.destroy();
        });
    },
  },

  confirmCloseOffer: function(successCallback) {
    var _this = this;
    Ember.$("#confirmCompleteReceiveModal").removeClass("open");
    Ember.$("#confirmCompleteReceiveModal").foundation("reveal", "open");
    Ember.$(".loading-indicator").remove();

    Ember.$("#confirmCompleteReceiveModal .closeLink").click(() => {
      _this.closeConfirmBox();
    });

    Ember.$("#confirmCompleteReceiveModal .confirmLink").click(() => {
      successCallback();
    });
  },

  closeConfirmBox: function() {
    Ember.run.next(function() {
      Ember.$("#confirmCompleteReceiveModal").foundation("reveal", "close");
      Ember.$("#confirmCompleteReceiveModal *").unbind('click');
    });
  },

});
