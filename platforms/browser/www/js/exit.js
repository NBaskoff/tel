jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Auth/Exit/",
        dataType: 'json',
        success: function (data) {
            document.location.href='auth.html';
        }
    });
});