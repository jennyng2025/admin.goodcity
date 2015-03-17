`import Ember from "ember"`
`import SharedTranslationsEn from "shared.goodcity/initializers/i18n-en"`

I18nTranslationsEn =
  name: "i18n-en"
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store.en = Ember.$.extend SharedTranslationsEn,
      "crossroads" : "Crossroads"
      "language": "en"
      "loading": "Loading..."
      "goodcity.hk" : "GoodCity.HK"
      "skip_intro" : "Skip intro"
      "next" : "Next"
      "back" : "Back"
      "error.message" : "Sorry, an error occurred!"
      "images" : "Images"
      "delete" : "Delete"
      "edit" : "Edit"
      "remove" : "Remove"
      "yes" : "Yes"
      "no" : "No"
      "ok" : "OK"
      "index.title" : "Crossroads Foundation Presents"
      "index.donate_goods" : "Donate your quality goods to people in need"
      "index.how" : "Learn How"
      "index.start" : "Start Now"
      "full_name" : "{{firstName}} {{lastName}}"
      "select_district" : "Select a district"

      "application":
        "home" : "Home"
        "all_offers" : "All Offers"
        "login" : "Log in"
        "logout" : "Logout"
        "register" : "Register"
        "tour" : "Tour"

      "authenticate":
        "input_code" : "Input Code"

      "contact":
        "title" : "Contact Details"
        "confirm_location" : "Who should we call to confirm location & address detail?"
        "name" : "Name"
        "phone" : "Phone"
        "address" : "Collection address (Hong Kong)"
        "street" : "Street"
        "building" : "Building"
        "flat" : "Flat"
        "done" : "Done"

      "districts":
        "all" : "All"

      "tour":
        "step1.title" : "1. Photograph & describe"
        "quality_items" : "quality items."
        "we_receive" : "What we receive."
        "step2.title" : "2. Submit for live review"
        "chat_questions" : "We'll chat if we have questions"
        "step3.title" : "3. Arrange transport"
        "accepted_items" : "for accepted items."
        "quick_easy" : "Quick & easy"
        "step4.title" : "4. People are helped"
        "make_goodcity" : "How you're making a Good City."
        "faq" : "Frequently Asked Questions"

      "offer":
        "disable": "Disable"
        "details" : "Offer details"

        "offer_details" :
          "heading" : "Offer Details"
          "is_collection": "Collection"
          "is_drop_off": "Drop-off"
          "is_gogovan": "Van Booked"
          "offer_messages": "General Messages"
          "accepted": "Accepted"
          "not_needed": "Not needed"
          "closed_offer_message": "Offer closed. No items needed, Sorry."

        "transport_details" :
          "accepted_items": "Accepted items to be transported"
          "time": "Booking Time"
          "name": "Contact Name"
          "phone": "Contact Phone"
          "address": "Address"
          "district": "District"
          "charity_sale": "Charity sale ok?"
          "modify": "Modify"
          "cancel_booking": "Cancel Booking"

      "items":
        "add_item":
          "description_placeholder" : "What is it? How many items? What's the size?"

      "item":
        "submitted_status": "This item is awaiting review."
        "in_review_status": "This item is being reviewed."
        "accepted_status": "This item has been accepted."
        "rejected_status": "This item has been rejected."

        "messages":
          "info_text1": "If we have questions when reviewing this item we will chat with you here."
          "info_text2": "If you want to add a comment to this item for our reviewers, type it below."

      "_resend":
        "no_sms" : "Haven't received SMS code?"
        "please_wait" : "Please wait 5 minutes..."
        "resend" : "Resend"

      "_verification_pin":
        "input_code" : "Input 4-digit SMS code we just sent you:"
        "auth_error" : "Sorry! Please enter the correct pin."

      "login":
        "hk_only" : "Mobile phone # (Hong Kong only)"
        "login" : "Login"
        "smscode": "Get 4-digit SMS code"

      "register":
        "hk_only" : "Mobile phone # (Hong Kong only)"
        "given_name" : "Given name"
        "family_name" : "Family name"
        "districts" : "Districts"
        "register" : "Register"
        "login" : "Login"

      "inbox":
        "quick_links": "Quick Links"
        "all_offers": "All Offers"
        "notifications": "Notifications"
        "new_offers": "New"
        "new_items" : "New Items"
        "scheduled_offers": "Scheduled"
        "in_review" : "In Progress"
        "my_list" : "My List"
        "finished": "Finished"
        "closed_offers": "Finished"

      "messages":
        "unread" : "Unread ({{unreadCount}})"
        "owner" : "You"

      "notifications":
        "text" : "{{text}}"
        "view": "View"

      "my_notifications":
        "heading" : "{{name}}'s Offer"

      "review_offer":
        "review_started_by" : "Started by {{firstName}} {{lastName}}"
        "no_items": "No items needed"
        "close_offer": "Close Offer"
        "items_reviewed": "All items reviewed"
        "set_logistics": "Set logistics"
        "to_complete": "to complete"
        "plan_transport": "User to plan transport."
        "reviewed": "Reviewed"
        "start_review": "Start Review"
        "goods_received_by" : "Goods received by {{firstName}} {{lastName}}"
        "offer_closed_by": "Offer closed by {{firstName}} {{lastName}}"

      "logistics":
        "no_items": "No items to transport."
        "offer_closed": "This offer is closed now."
        "close_offer": "Close Offer"
        "message_donor": "Message Donor"
        "finish_review_request": "Please finish reviewing items first!"
        "accepted_items": "Accepted Items"
        "gogovan_requirement": "Gogovan Reqirement"
        "crossroads_requirement": "Crossroads Requirement"

      "review_item":
        "accept" : "Accept"
        "accept_item" : "Accept Item"
        "reject" : "Reject"
        "reject_item" : "reject Item"
        "not_now" : "Not Now"
        "donor_message" : "Donor"
        "supervisor_message" : "Supervisors"
        "view_lable_guide": "View labeling guide"
        "condition": "Condition"
        "add_component": "Add component"

      "reject":
        "select_type": "Please choose Item Type first!"
        "option_error": "Please choose a reason."
        "reject_item": "Reject Item"
        "quality" : "Quality"
        "size": "Size"
        "supply": "Supply/Demand"
        "message_placeholder" : "Message to donor about the rejection of this item"
        "reject_message" : "Unfortunately we cannot receive this item. "
        "quality_message" : "Some categories of items are very difficult for us to distribute unless they are in excellent condition."
        "size_message" : "Very few of our clients are able to accommodate large items in their homes."
        "supply_message" : "Unfortunately we cannot receive this item because we have a large quantity already in stock."

    # this is how we set default language
    Ember.I18n.translations = Ember.I18n.translation_store.en

`export default I18nTranslationsEn`