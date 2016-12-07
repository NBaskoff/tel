jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Phones/GetHtml/",
        dataType: 'json',
        data: ({nomer: $_GET.id[0]}),
        success: function (data) {
            //tableHistory.records = data;
            jQuery(".phoneName").html(data.record.phones_name);
            jQuery(".phoneGroup").html(data.record.phones_group[0].phones_group_name);
            jQuery(".phoneUser").html(data.record.phones_user[0].user_name);
            jQuery(".phoneBody").html(data.record.phones_body);
            jQuery(".phoneLink").attr("href", "cabinet.html?phone="+encodeURIComponent(data.record.phones_name));
            
            for (var i = 0; i < data.comments.length; i++) {
                 var item = data.comments[i];
                 var html = '<tr>\n\
                                <td>'+item.phones_calls_id+'</td>\n\
                                <td>'+data.record.phones_name+'</td>\n\
                                <td>'+item.phones_calls_dt+'</td>\n\
                                <td>'+item.phones_calls_group[0].phones_group_name+'</td>\n\
                                <td>'+data.record.phones_user[0].user_name+'</td>\n\
                                <td>'+item.phones_calls_clarification+'</td>\n\
                                <td>'+data.record.phones_body+'</td>\n\
                            </tr>';
                jQuery("#historyTable tbody").append(html);
             }
        }
    });
});