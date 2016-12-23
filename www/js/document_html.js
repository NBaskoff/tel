jQuery(document).ready(function () {
    //Для начала получим рубрики
    if ($_GET == undefined) {
        var selectDocument = 0;
    } else {
        var selectDocument = $_GET["id"][0];
    }

    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Document/GetDocument/",
        data: ({id: selectDocument}),
        dataType: 'json',
        success: function (data) {
            jQuery(".documentName").html(data.document_items_name);
            var exurl = 'http://tele1000.ru/document/download/' + selectDocument + '?user=' + user.user_id + '';
            var url = '<a class="getLink" href="#" onclick="window.open(' + "'" + exurl + "'" + ', ' + "'" + '_system' + "'" + ');">\n\
                        <div class="btn btn-primary" style="margin-bottom: 15px;">Посмотреть / Скачать</div>\n\
                    </a>\n\
                    <a class="getOwner" href="document.html?id=' + data.document_items_owner + '">\n\
                        <div class="btn btn-primary" style="margin-bottom: 15px;">Вернуться назад</div>\n\
                    </a>\n\
                    <div class="clear"></div>\n\
                    <div class="iframeShow">\n\
                        <iframe width="100%" height="560px" src="http://tele1000.ru/document/showHtml/' + data.document_items_id + '?user=' + user.user_id + '"></iframe>\n\
                    </div>';
            jQuery(".iframeBtnShow").html(url);
        }
    });



});