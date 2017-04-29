function resetBlazeLayout() {
    BlazeLayout.reset();
}

FlowRouter.triggers.enter([resetBlazeLayout]);

// configure
BlazeLayout.setRoot('body');

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'layout_notFound'
        });
    }
};

// redirect on start to dahsboard on file protocol
if(location.origin === 'file://') {
    FlowRouter.wait();
    FlowRouter.initialize({hashbang: true});

    Meteor.startup(function() {
        FlowRouter.go('dashboard');
    });
}


FlowRouter.triggers.enter([function(){
    EthElements.Modal.hide();
    $(window).scrollTop(0);
}, updateMistMenu]);



// ROUTES

/**
The receive route, showing the wallet overview

@method dashboard
*/
FlowRouter.route('/', {
    name: 'dashboard',
    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_dashboard'
        });
    }
});

    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
        });
    }
});


    action: function(params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
        });
    }
});
