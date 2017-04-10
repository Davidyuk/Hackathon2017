Template['views_registry_create'].events({
    'submit form': function(e) {
        var template = Template.instance();
        TemplateVar.set('wait', true);
        $.ajax({
            url: '/solidity/Registry.sol',
            success: function (data){
                var Registry = web3.eth.compile.solidity(data).Registry;
                web3.eth.contract(JSON.parse(Registry.interface)).new({
                    from: e.target['dapp-select-account'].value,
                    data: Registry.bytecode
                }, function(err, contract) {
                    if (!err && contract.address)
                        console.log("deployed on:", contract.address);
                });
            }
        });
    }
});

Template['views_registry_create'].helpers({
    'showForm': function() {
        return !TemplateVar.get('wait');
    }
});
