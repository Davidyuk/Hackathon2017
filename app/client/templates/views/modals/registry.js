Template['views_registry'].onCreated(function () {
    var template = this;
    TemplateVar.set(template, 'org-ok', false);
});

Template['views_registry'].onRendered(function() {
    var idParam = FlowRouter.getParam('id');
    if (idParam && web3.isAddress(idParam) /* мы его владелец*/) {
        TemplateVar.set(this, 'org-ok', true);
        //получение организаций
    } else {
        TemplateVar.set(this, 'org-ok', false);
    }
});

Template['views_registry'].events({
    'submit form.add-reg': function(e) {
        FlowRouter.go('registry', {id: e.target.to.value.slice(2)});
    },

    'submit form.add-org': function (e) {
        console.log(e.target.to.value);
    }
});

Template['views_registry'].helpers({
    'registryId': function() {
        return FlowRouter.getParam('id');
    }
});
