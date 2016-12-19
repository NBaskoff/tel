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
           jQuery(".getLink").each(function(){
              var url = jQuery(this).attr("link");
              url = url.replace("[id]", data.document_items_id);
              url = url.replace("[user]", user.user_id);
              jQuery(this).attr("href", url);
           });
           jQuery(".getSrc").each(function(){
              var url = jQuery(this).attr("link");
              url = url.replace("[id]", data.document_items_id);
              url = url.replace("[user]", user.user_id);
              jQuery(this).attr("src", url);
           });  
           jQuery(".getOwner").each(function(){
              var url = jQuery(this).attr("link");
              url = url.replace("[id]", data.document_items_owner);
              url = url.replace("[user]", user.user_id);
              jQuery(this).attr("href", url);
           });             
        }
    });    

    
});