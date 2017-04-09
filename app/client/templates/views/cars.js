var template;

Template['views_cars'].onCreated(function() {
});

Template['views_cars'].onRendered(function() {
    template = this;
    let autoId = FlowRouter.getParam('id');

    if (web3.isAddress(autoId)) {
        let auto = web3.eth.contract(Meteor.ethContcactConfig.autoAbi).at(autoId);

        let l = auto.getOperationsLength().toNumber();
        console.log(l);
        console.log(auto.owner());
        console.log(auto.registry());
        console.log(auto.hidden());

        TemplateVar.set(template, 'loading', true);

        function formatDate(val){
            return val < 10 ? '0' + val : val;
        }

        let autoInfo = [{
            owner: auto.owner(),
            autoId: auto.id(),
            historyShowed: auto.hidden() ? 'Да' : 'Нет'
        }];

        let services = [];
        for (let i = (l-1); i >= 0; i--) {
            let service = {};
            let o = auto.operations(i);
            o[0] = o[0].toNumber();

            let seconds = o[4].toNumber() * 1000;
            let date = new Date(seconds);
            o[4] = formatDate(date.getDate()) + '.' +formatDate(date.getMonth()) + '.' + formatDate(date.getFullYear());

            let r = web3.eth.contract(Meteor.ethContcactConfig.registryAbi).at(o[1]);
            o[5] = r.name();
            o[6] = r.operationTypes(o[0]);
            let p = r.performers(o[2]);
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