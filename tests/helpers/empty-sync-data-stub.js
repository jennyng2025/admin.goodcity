import config from '../../config/environment';
import '../fixtures/territory';
import '../fixtures/address';
import '../fixtures/contact';
import '../fixtures/schedule';
import '../fixtures/delivery';
import '../fixtures/gogovan_order';
import '../fixtures/offer';
import '../fixtures/package_type';
import '../fixtures/package';
import '../fixtures/donor_condition';
import '../fixtures/rejection_reason';
import '../fixtures/permission';
import '../fixtures/user_profile';
import '../fixtures/timeslot';
import '../fixtures/gogovan_transport';
import '../fixtures/crossroads_transport';
import '../fixtures/message';
import '../fixtures/version';

export default function(testHelper) {
  config.APP.PRELOAD_TYPES.concat(config.APP.PRELOAD_AUTHORIZED_TYPES).forEach(function(type) {
    testHelper.handleFindAll(type, 0);
  });

  $.mockjax({url:"/api/v1/auth/current_user_profil*",
    responseText: {"user_profile": FactoryGuy.build("user_profile")} });

  //hide sync-data related mocks from console, but show test related mocks
  $.mockjaxSettings.logging = false;
  testHelper.container.lookup("router:main").one('didTransition', function() {
    $.mockjaxSettings.logging = true;
  });
}
