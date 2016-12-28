jQuery(document).ready(function () {
    jQuery(".findBox .panel-body .row").on("click", ".addPhone", function(){
        user_id = jQuery(this).attr("id");
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
function findPLID(date) {
    jQuery(".findBox .panel-body .row").html("");
    for (var key in date.users) {
        var user = date.users[key];
        var dt = Date.parse(user.user_dob);
        var phones = "";
        for (var keyP in user.phones) {
            var phone = user.phones[keyP];
            if (phone["phones_body"] != "") {
                phones = phones + "<b>" + phone["phones_name"] + ": </b>" + strip_tags(phone["phones_body"]) + "<br>";
            } else {
                phones = phones + "<b>" + phone["phones_name"] + "</b><br>";
            }
        }
        html = '<div class="col-sm-6 col-md-4">\n\
                    <div class="thumbnail">\n\
                        <div class="caption">\n\
                            <h3>' + user.user_name + '</h3>\n\
                            <p>\n\
                                <b>Email:</b> ' + user.user_email + '<br>\n\
                                <b>PL ID:</b> ' + user.user_pl_id + '<br>';
        if (dt == null) {
            //html = '<b>Дата рождения:</b> '+dt.toString('dd.MM.yyyy')+'<br>';
        } else {
            html = html + '<b>Дата рождения:</b> ' + dt.toString('dd.MM.yyyy') + '<br>';
        }
        html = html + '<b>Skype:</b> ' + user.user_skype + '<br>\n\
                                <b>Адрес:</b> ' + user.user_address + '<br>\n\
                                <b>Сайт:</b> ' + user.user_site + '<br>\n\
                                <b>Телефон(ы):</b><br>\n\
                                ' + phones + '\n\
                            </p>\n\
                            <div class="btn btn-primary btn-block addPhone" id="' + user.user_id + '">Добавить контакт<br>в записную книжку</div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
        jQuery(".findBox .panel-body .row").append(html);
    }

    function strip_tags(str) {	// Strip HTML and PHP tags from a string
        return str.replace(/<\/?[^>]+>/gi, '');
    }
}