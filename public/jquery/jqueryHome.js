$(function() {
    $(document).ready(function() {

        $('#wrapper').dialog({

            autoOpen: false,
            title: 'Log in to Twitter',
            modal : true,
            height : 350,
            width : 540
        }).prev(".ui-dialog .ui-dialog-titlebar").hide();

        $('#button1').click(function() {
            $('#wrapper').dialog('open');
        });
    });
});