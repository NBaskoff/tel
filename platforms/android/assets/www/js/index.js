jQuery(document).ready(function () {
    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Phones_Group/GetGroups/",
        dataType: 'json',
        success: function (data) {
            //jQuery("textarea").val(location.href);
            for (var key in data.records) {
                var item = data.records[key];
                jQuery("select[name=group]").append('<option value="'+item.phones_group_id+'">'+item.phones_group_name+'</option>');
            }
        }
    }); 
    var now = new Date();
    jQuery("input[name=date]").val(now.toString('yyyy-MM-dd'));
    jQuery("input[name=time]").val(now.toString('HH:mm'));
    
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
    
    
    var test = new Vue({
        el: "#test",
        data: {
            text: "ntcn",
        }
    });
});