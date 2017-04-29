var template;

Template['views_sign'].onCreated(function () {
    template = this;
    // TemplateVar.set(template, 'get', change);
});

Template['views_sign'].events({
    'submit form': function(e) {
        var  form = $(".reg-service");
        $('#file-input').on("change", function(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                var fileData = event.target.result;
                console.log(fileData);
            };

            reader.readAsText(file);
        });
        $('#file-input').trigger('click');
    },

    'change #selectDoc': function(e){
        $("#selectDoc option").each(function()
        {
            TemplateVar.set(template, $(this).val(), false);
        });
        var newValue = $(e.target).val();
        TemplateVar.set(template, newValue, true);
    }

});
