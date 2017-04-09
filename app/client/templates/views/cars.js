Template['views_cars'].onCreated(function() {
});

Template['views_cars'].onRendered(function() {
    var template = this;
    var autoId = FlowRouter.getParam('id');

    if (web3.isAddress(autoId)) {
        var auto = web3.eth.contract(Meteor.ethContcactConfig.autoAbi).at(autoId);

        var l = auto.getOperationsLength().toNumber();
        console.log(l);
        console.log(auto.owner());
        console.log(auto.registry());
        console.log(auto.hidden());

        TemplateVar.set(template, 'loading', true);

        function formatDate(val){
            return val < 10 ? '0' + val : val;
        }

        var autoInfo = [{
            owner: auto.owner(),
            autoId: auto.id(),
            historyShowed: auto.hidden() ? 'Да' : 'Нет'
        }];

        var services = [];
        for (var i = (l-1); i >= 0; i--) {
            var service = {};
            var o = auto.operations(i);
            o[0] = o[0].toNumber();

            var seconds = o[4].toNumber() * 1000;
            var date = new Date(seconds);
            o[4] = formatDate(date.getDate()) + '.' +formatDate(date.getMonth()) + '.' + formatDate(date.getFullYear());

            var r = web3.eth.contract(Meteor.ethContcactConfig.registryAbi).at(o[1]);
            o[5] = r.name();
            o[6] = r.operationTypes(o[0]);
            var p = r.performers(o[2]);
            console.log(p);
            p[1] = p[1].toNumber();
            o[7] = p;
            console.log(o);

            service.registry = o[5];
            service.name = (o[7][0] === '' ? o[2] : o[7][0]);
            service.rating = o[7][1] === 0 ? '-' : o[7][1];
            service.service = o[6][0];
            service.date = o[4];
            service.comment = o[3];

            services.push(service);
        }
        console.log(services);

        TemplateVar.set(template, 'services', services);
        TemplateVar.set(template, 'loading', false);
        TemplateVar.set(template, 'autos', autoInfo);
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
