jQuery(document).ready(function () {
    jQuery("body").on("click", "a", function () {
        var text = jQuery(this).attr("question");
        if (text != undefined)
        {
            return confirm(text);
        } else
        {
            return true;
        }
    });
    jQuery("body").on("click", "button", function () {
        var text = jQuery(this).attr("question");
        if (text != undefined)
        {
            return confirm(text);
        } else
        {
            return true;
        }
    });

});

