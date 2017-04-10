Template['views_registry'].onRendered(function() {
    var template = this;

    if (FlowRouter.getParam('address')) {
        var address = FlowRouter.getParam('address');
        $.ajax({
            url: '/solidity/Registry.sol',
            success: function (data){
                var Registry = web3.eth.compile.solidity(data).Registry;
                var contractInstance = web3.eth.contract(Registry.interface).at(address);
                console.log(contractInstance);
            }
        });
    }
});

Template['views_registry'].events({
    'submit form.register': function(e) {
        FlowRouter.go('registry', { address: e.target.to.value });
    },
    'submit form.service-type': function(e) {
    },
    'submit form.service': function(e) {
    }
});

Template['views_registry'].helpers({
    'address': function() {
        return FlowRouter.getParam('address');
    }
});
