jQuery(document).ready(function () {
    if ($_GET != undefined && $_GET.textOK != undefined) {
        jQuery(".formAjax").addClass("contentBody").html($_GET.textOK);
    } else {
        jQuery.ajax({
            type: "POST",
            url: "http://tele1000.ru/api/1/Phones_Group/GetGroups/",
            dataType: 'json',
            success: function (data) {
                //jQuery("textarea").val(location.href);
                for (var key in data.records) {
                    var item = data.records[key];
                    jQuery("select[name=group]").append('<option value="' + item.phones_group_id + '">' + item.phones_group_name + '</option>');
                }
            }
        });
        var now = new Date();
        jQuery(".formAjax input[name=date]").val(now.toString('yyyy-MM-dd'));
        jQuery(".formAjax input[name=time]").val(now.toString('HH:mm'));
        if ($_GET != undefined && $_GET.phone != undefined) {
            jQuery(".formAjax input[name=phone]").val($_GET.phone);
            UpdatePhone();
        }
        jQuery(".formAjax input[name=phone]").keypress(function () {
            UpdatePhone();
        });
    }


    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Cabinet/GetHistory/",
        dataType: 'json',
        success: function (data) {
            //tableHistory.records = data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var html = '<tr>\n\
                                <td>' + item.phones_calls_id + '</td>\n\
                                <td><a href="phones.html?id=' + item.phones_calls_owner[0].phones_id + '">' + item.phones_calls_owner[0].phones_name + '</a></td>\n\
                                <td>' + item.phones_calls_dt + '</td>\n\
                                <td>' + item.phones_calls_group[0].phones_group_name + '</td>\n\
                                <td>' + item.phones_calls_owner[0].phones_user[0].user_name + '</td>\n\
                                <td>' + item.phones_calls_clarification + '</td>\n\
                                <td>' + item.phones_calls_owner[0].phones_body + '</td>\n\
                            </tr>';
                jQuery("#historyTable tbody").append(html);
            }
        }
    });
});
function UpdatePhone() {
    var nomer = jQuery(".formAjax input[name=phone]").val();
    if (nomer != undefined) {
        var stripNomer = nomer.replace("_", "");
        if (stripNomer.length == 17) {
            jQuery.ajax({
                type: "POST",
                url: "http://tele1000.ru/api/1/Phones/GetNomerInfo/",
                dataType: "json",
                data: ({nomer: nomer}),
                success: function (data) {
                    if (data != null) {
                        if (data.phones_id > 0) {
                            var url = jQuery(".phoneExist a").attr("src");
                            url = url.replace("[id]", data.phones_id);
                            jQuery(".phoneExist a").attr("href", url);
                            jQuery(".phoneExist").css("display", "block");
                        } else {
                            jQuery(".phoneExist").css("display", "none");
                        }
                        if (data.phones_group != null) {
                            jQuery("select[name=group]").val(data.phones_group[0].phones_group_id);
                        } else {
                            jQuery("select[name=group]").val(0);
                        }
                        if (data.phones_user != null) {
                            jQuery("input[name=master]").val(data.phones_user[0].user_name);
                        } else {
                            jQuery("input[name=master]").val("");
                        }
                        if (data.phones_body != null && data.phones_body != "") {
                            jQuery(".phoneExpertComment span").html(data.phones_body);
                            jQuery(".phoneExpertComment").css("display", "block");
                        } else {
                            jQuery(".phoneExpertComment").css("display", "none");
                        }
                    } else {
                        jQuery(".phoneExist").css("display", "none");
                        jQuery("select[name=group]").val(0);
                        jQuery("input[name=master]").val("");
                        jQuery(".phoneExpertComment").css("display", "none");
                    }
                }
            });
        }
    }
};