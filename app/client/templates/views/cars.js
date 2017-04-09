var template;

Template['views_cars'].onCreated(function() {
});

Template['views_cars'].onRendered(function() {
    template = this;
    var autoId = FlowRouter.getParam('id');

    if (web3.isAddress(autoId)) {
        var auto = web3.eth.contract(Meteor.ethContcactConfig.autoAbi).at(autoId);

        var l = auto.getOperationsLength().toNumber();
        console.log(l);

        console.log(auto.owner());
        console.log(auto.registry());
        console.log(auto.hidden());


        TemplateVar.set(template, 'loading', true);
        var names = [];
        var dates = [];
        var comments = [];
        var services = [];
        for (var i = (l-1); i >= 0; i--) {
            var service = new Object();
            var o = auto.operations(i);
            o[0] = o[0].toNumber();
            o[4] = o[4].toNumber();
            var r = web3.eth.contract(Meteor.ethContcactConfig.registryAbi).at(o[1]);
            o[5] = r.name();
            o[6] = r.operationTypes(o[0]);
            var p = r.performers(o[2]);
            // console.log(p);
            p[1] = p[1].toNumber();
            o[7] = p;
            console.log(o);

            service.name = o[5];
            service.date = o[4];
            service.comment = o[3];
            services.push(service);
        }
        console.log(services);
        TemplateVar.set(template, 'services', services);
        // setTimeout(function() {
        //
        //     TemplateVar.set(template, 'services', [3, 2, 1]);
        // }, 3000);
        TemplateVar.set(template, 'loading', false);
    }
});

Template['views_cars'].events({
    'submit form': function(e) {
        FlowRouter.go('car', { id: e.target.to.value.slice(2) });
    }
});

Template['views_cars'].helpers({
    'carId': function() {
        return FlowRouter.getParam('id');
    }
});