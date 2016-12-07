jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Cabinet/GetHistory/",
        dataType: 'json',
        success: function (data) {
            //tableHistory.records = data;
             for (var i = 0; i < data.length; i++) {
                 var item = data[i];
                 var html = '<tr>\n\
                                <td>'+item.phones_calls_id+'</td>\n\
                                <td><a href="phones.html?id='+item.phones_calls_owner[0].phones_id+'">'+item.phones_calls_owner[0].phones_name+'</a></td>\n\
                                <td>'+item.phones_calls_dt+'</td>\n\
                                <td>'+item.phones_calls_group[0].phones_group_name+'</td>\n\
                                <td>'+item.phones_calls_owner[0].phones_user[0].user_name+'</td>\n\
                                <td>'+item.phones_calls_clarification+'</td>\n\
                                <td>'+item.phones_calls_owner[0].phones_body+'</td>\n\
                            </tr>';
                jQuery("#historyTable tbody").append(html);
             }
        }
    });
});