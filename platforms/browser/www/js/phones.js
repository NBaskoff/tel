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
            if (data.record.phones_user[0].user_name != undefined) {
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
        var user = jQuery(".phoneUser").html();
        var myContact = navigator.contacts.create({"displayName": user});
        var name = new ContactName();
        name.givenName = user;
        myContact.name = name;

        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', jQuery(".phoneName").html(), false);
        //phoneNumbers[1] = new ContactField('mobile', '917-555-5432', true); // preferred number
        //phoneNumbers[2] = new ContactField('home', '203-555-7890', false);
        myContact.phoneNumbers = phoneNumbers;

        myContact.note = "";

        myContact.save(onSuccessCallBack, onErrorCallBack);
        
        function onSuccessCallBack(contact) {
            alert("Контакт сохранён");
        };

        function onErrorCallBack(contactError) {
            alert("Error = " + contactError.code);
        };        
    });
    
});