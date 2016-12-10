var user = null;
// get query arguments
var $_GET = parseURLParams(window.location.href);
jQuery(document).ready(function () {
    //Проверим юзера и если нету - на авторизацию.
    var path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 1];
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
                    if (path == "index.html" || path == "") {
                        $(".animate").animate({opacity: 0}, 1500, "linear", function() {/*document.location.href='cabinet.html';*/})
                    }                    
                } else {
                     document.location.href='auth.html'
                }
            }
        });         
    }
    
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
    jQuery(".contentPage").each(function(){
        var box = jQuery(this);
        var page = jQuery(this).attr("page");
        jQuery.ajax({
            type: "POST",
            url: "http://tele1000.ru/api/1/Page/GetPage/",
            data: ({page : page}),
            success: function (data) {
                try {
                    var pdata = JSON.parse(data);
                } catch (err) {
                    alert("Ошибка, Попробуйте позже.");
                    alert(data);
                }
                jQuery(".contentPage_name").html(pdata.page_name);
                jQuery(".contentPage_body").html(pdata.page_body);
            }
        });        
    });
});
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
