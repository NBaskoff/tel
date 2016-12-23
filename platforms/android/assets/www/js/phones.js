jQuery(document).ready(function () {
    var user_id = 0;
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
            user_id = data.record.phones_user[0].user_id;
            if (data.record.phones_user[0].user_id != undefined) {
                jQuery(".addContact").css("display", "block");
            }
            jQuery(".phoneBody").html(data.record.phones_body);
            jQuery(".phoneLink").attr("href", "cabinet.html?phone="+encodeURIComponent(data.record.phones_name));
            for (var i = 0; i < data.record.phones_files.length; i++) {
                var item = data.record.phones_files[i];
                var html = '<a href="http://tele1000.ru'+item.files_path+'">'+item.files_name+'</a><br>';
                jQuery(".phoneFiles").append(html);
            }
            for (var i = 0; i < data.comments.length; i++) {
                 var item = data.comments[i];
                 var html = '<tr>\n\
                                <td>'+item.phones_calls_id+'<br>\n\
                                '+data.record.phones_name+'<br>\n\
                                '+item.phones_calls_dt+'<br>\n\
                                '+item.phones_calls_group[0].phones_group_name+'<br>\n\
                                '+data.record.phones_user[0].user_name+'<br>\n\
                                '+item.phones_calls_clarification+'<br>\n\
                                '+data.record.phones_body+'<br></td>\n\
                            </tr>';

                jQuery("#historyTable tbody").append(html);
             }
        }
    });
    jQuery(".addContact").click(function() {

        jQuery.ajax({
            type: "POST",
            url: "http://tele1000.ru/api/1/Phones_User/GetInfo/",
            dataType: 'json',
            data: ({id:user_id}),
            success: function (data) {
                var myContact = navigator.contacts.create({"displayName": data.user.user_name});
                var name = new ContactName();
                name.givenName = data.user.user_name;
                myContact.name = name;
                var phoneNumbers = [];
                for (var i = 0; i < data.phones.length; i++) {
                    var item = data.phones[i];
                    phoneNumbers[phoneNumbers.length] = new ContactField('work', item.phones_name, false);
                }
                myContact.phoneNumbers = phoneNumbers;
                myContact.note = "";
                myContact.birthday = data.user.user_dob;
                
                var emails = [];
                emails[0] = new ContactField('work', data.user.user_email, false);
                myContact.emails = emails;
                
                var addresses = [];
                addresses[0] = new ContactAddress('work', data.user.user_address, false);
                myContact.addresses = addresses;
                
                var urls = [];
                urls[0] = new ContactField('work', data.user.user_site, false);
                myContact.urls = urls;
                
                myContact.save(onSuccessCallBack, onErrorCallBack);
                function onSuccessCallBack(contact) {
                    alert("Контакт сохранён");
                };
                function onErrorCallBack(contactError) {
                    alert("Error = " + contactError.code);
                };
            }
        });

    });

});