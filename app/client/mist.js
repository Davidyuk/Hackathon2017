updateMistBadge = function(){
    if(typeof mist !== 'undefined') {
        mist.menu.setBadge('');
    }
};

// ADD MIST MENU
updateMistMenu = function(){
    if(typeof mist === 'undefined')
        return;

    Meteor.setTimeout(function(){
        var routeName = FlowRouter.current().route.name;

        // add/update mist menu
        mist.menu.clear();
        mist.menu.add('registry',{
            position: 1,
            name: 'Реестр',
            selected: routeName === 'registry'
        }, function(){
            FlowRouter.go('/registry');
        });
        mist.menu.add('cars',{
            position: 2,
            name: 'Автомобиль',
            selected: routeName === 'cars' || routeName === 'car'
        }, function(){
            FlowRouter.go('/cars');
        });
        mist.menu.add('services',{
            position: 3,
            name: 'Услуги',
            selected: routeName === 'services'
        }, function(){
            FlowRouter.go('/services');
        });
        mists.menu.add('/new_machine', {
            position: 4,
            name: 'Добавить автомобиль',
            selected: reuteName === 'new_machine'
        }, function() {
            lowRouter.go('/services');
        });

        // set total balance in header.js
    }, 10);
};


Meteor.startup(function() {

    // make reactive
    Tracker.autorun(updateMistMenu);

    web3.setProvider(new web3.providers.HttpProvider('http://10.193.25.22:8545'));

});