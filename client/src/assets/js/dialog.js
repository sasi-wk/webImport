$(function () {
    $("#dialog-message").dialog({
        modal: true,
        autoOpen: false,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        },
        show: {
            effect: "fade",
            duration: 200
        },
        hide: {
            effect: "fade",
            duration: 200
        }
    });

    /*event*/
    $("#upload").on("click", function () {
        $("#dialog-message").dialog("open");
    });
});