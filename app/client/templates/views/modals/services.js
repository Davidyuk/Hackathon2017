Template['views_services'].onCreated(function () {

});

Template['views_services'].onRendered(function() {

});

Template['views_services'].events({
    'submit form': function(e) {
        console.log(e.target.to.value);
        e.target.reset();
        setTimeout(function() {
            alert(Math.round(Math.random() * 5) ? "Услуга добавлена" : "Произошла ошибка");
        }, 3000);
    }
});

Template['views_services'].helpers({
    'carId': function() {
        return FlowRouter.getParam('id');
    }
});
