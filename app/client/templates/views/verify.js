Template['views_verify'].events({
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
    }
});

