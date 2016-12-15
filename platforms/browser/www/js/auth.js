jQuery(document).ready(function () {
    jQuery("input[name=email]").val(window.localStorage.getItem("login"));
    jQuery("input[name=pass]").val(window.localStorage.getItem("pass"));
    jQuery(".btnAuth").click(function(){
        if (jQuery("input[name=save]").prop("checked")) {
            window.localStorage.setItem("login", jQuery("input[name=email]").val());
            window.localStorage.setItem("pass", jQuery("input[name=pass]").val());
        } else {
            window.localStorage.setItem("login", "");
            window.localStorage.setItem("pass", "");
        }
    });
});