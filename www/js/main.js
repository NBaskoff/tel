var user = null;
jQuery(document).ready(function () {
    //Проверим юзера и если нету - на авторизацию.
    var path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 1];
    alert(path);
    if (path != "auth.html" && path != "reg.html") {
        jQuery.ajax({
            type: "POST",
            url: "http://tele1000.ru/api/1/Auth/GetUser/",
            //data: ({a : aaa, b : bbb}),
            success: function (data) {
                try {
                    var pdata = JSON.parse(data);
                } catch (err) {
                    alert("Ошибка, Попробуйте позже.");
                    alert(data);
                }
                if (pdata != null) {
                    user = pdata;
                } else {
                     document.location.href='auth.html'
                }
            }
        });         
    };
    jQuery(".phoneMask").mask("+7 (999) 999-9999");    
    
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

