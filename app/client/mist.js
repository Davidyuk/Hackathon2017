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
            position: 1,
        }, function(){
        });
            position: 2,
        }, function(){
        });

        // set total balance in header.js
    }, 10);
};


Meteor.startup(function() {

    // make reactive
    Tracker.autorun(updateMistMenu);

    web3.setProvider(new web3.providers.HttpProvider('http://77.35.180.244:8545'));

});