jQuery(document).ready(function () {
    //Для начала получим рубрики
    if ($_GET == undefined) {
        var selectCatalog = 0;
    } else {
        var selectCatalog = $_GET["id"][0];
    }
    
    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Document/GetCatalog/",
        data: ({id: selectCatalog}),
        dataType: 'json',
        success: function (data) {
            var html = getLevel(data);
            jQuery(".catalogMenu").html(html);
        }
    });
    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Document/GetDocuments/",
        data: ({id: selectCatalog}),
        dataType: 'json',
        success: function (data) {
             for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var html = '<tr>\n\
                                <td>\n\
                                    ' + item.document_items_id + '<br>\n\
                                    <a href="document_html.html?id=' + item.document_items_id + '">' + item.document_items_name + '</a><br>\n\
                                    ' + item.document_items_preview + '<br>\n\
                                </td>\n\
                            </tr>';
                jQuery("#documentTable tbody").append(html);
             }            
        }
    });    
    function getLevel(data) {
        var html = "";
        for (var key in data) {
            var item = data[key];
            if (item.childCount > 0) {
                var thisHtml = getLevel(item.child);
                html = html + "<li>"+item.document_name+"<ul>"+thisHtml+"</ul></li>";
            } else {
                html = html + "<li><a href='?id="+item.document_id+"'>"+item.document_name+"</a></li>";
            }
        }
        return html;
    }
    
});