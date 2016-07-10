$(function() {
    $(document).ready(function() {

        $('#wrapper').dialog({

            autoOpen: false,
            title: 'Compose new Tweet',
            modal : true,
            height : 300,
            width : 500
        }).prev(".ui-dialog .ui-dialog-titlebar").hide();

        $('#tweetButton').click(function() {
            $('#wrapper').dialog('open');
        });
    });
});