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
        mist.menu.add('verify',{
            position: 1,
            name: 'Verify',
            selected: routeName === 'verify'
        }, function(){
            FlowRouter.go('/verify');
        });
        mist.menu.add('sign',{
            position: 2,
            name: 'Sign',
            selected: routeName === 'sign'
        }, function(){
            FlowRouter.go('/sign');
        });

        // set total balance in header.js
    }, 10);
};


Meteor.startup(function() {

    // make reactive
    Tracker.autorun(updateMistMenu);

    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


});