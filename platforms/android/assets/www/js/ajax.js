jQuery(document).ready(function () {
    jQuery(document).ajaxStart(function () {
        jQuery(".bgmodal").css("display", "block");
    });
    jQuery(document).ajaxStop(function () {
        jQuery(".bgmodal").css("display", "none");
    });
    jQuery(document).ajaxError(function () {
        jQuery(".bgmodal").css("display", "none");
    });
    jQuery(document).ajaxStop(function () {
        jQuery(".bgmodal").css("display", "none");
    });
    //сделаем общий JS для стандартных форм
    jQuery("div[class^=error__]", ".formAjax").addClass("error__text");
    jQuery("form", ".formAjax").submit(function () {
        var box = jQuery(this).parent(".formAjax");
        var url = jQuery(box).attr("url");
        var options = {
            url: url,
            type: "POST",
            dataType: "text",
            beforeSubmit: function (data) {
                jQuery(".has-error", box).removeClass("has-error");
                jQuery(".error__text", box).text("");
                jQuery(".load__box", box).css("display", "block");
            },
            success: function (data) {
                jQuery(".load__box", box).css("display", "none");
                try {
                    var pdata = JSON.parse(data);
                } catch (err) {
                    alert("Ошибка, Попробуйте позже.");
                    alert(data);
                }
                if (pdata.error !== null)
                {
                    for (var key in pdata.error)
                    {
                        var val = pdata.error[key];
                        jQuery(".error__" + key + "", box).text(val);
                        var el = jQuery("*[name=" + key + "]", box);
                        jQuery(el).parents(".form-group").eq(0).addClass("has-error");
                        jQuery(".codeConfirmImgSrc_img").attr("src", pdata.codeConfirmImgSrc);
                    }
                } else
                {
                    jQuery(box).addClass("contentBody").html(pdata.text);
                }
                if (pdata.reload == true)
                {
                    location.reload();
                }
            }
        };
        $(this).ajaxSubmit(options);
        return false;
    });
});

