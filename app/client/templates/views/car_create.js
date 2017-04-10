Template['views_car_create'].onRendered(function() {
    var template = this;

    if (FlowRouter.getParam('id')) {
        TemplateVar.set(template, 'loading', true);
        TemplateVar.set(template, 'services', [1]);
        setTimeout(function() {
            TemplateVar.set(template, 'loading', false);
            TemplateVar.set(template, 'services', [3, 2, 1]);
        }, 3000);
    }
});

Template['views_car_create'].events({
    'submit form': function(e) {
        FlowRouter.go('car', { id: e.target.to.value.slice(2) });
    }
});

Template['views_car_create'].helpers({
    'carId': function() {
        return FlowRouter.getParam('id');
    }
});
