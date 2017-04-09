Template['views_new_machine'].onCreated(function () {
});

Template['views_new_machine'].onRendered(function() {

});

Template['views_new_machine'].events({
    'submit form.add-reg': function(e) {
        FlowRouter.getParam();
    }

});

Template['views_new_machine'].helpers({
    'regId': function() {
        return FlowRouter.getParam('id');
    }
});

