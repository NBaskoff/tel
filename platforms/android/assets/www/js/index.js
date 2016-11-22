jQuery(document).ready(function () {
    jQuery(".phoneMask").mask("+7 (999) 999-9999");    
    jQuery.ajax({
        type: "POST",
        url: "http://tele1000.ru/api/1/Phones_Group/GetGroups/",
        //data: ({a : aaa, b : bbb}),
        success: function (data) {
            try {
                var pdata = JSON.parse(data);
            } catch (err) {
                alert("Ошибка, Попробуйте позже.");
                alert(data);
            }
            //jQuery("textarea").val(location.href);
            for (var key in pdata.records) {
                var item = pdata.records[key];
                jQuery("select[name=group]").append('<option value="'+item.phones_group_id+'">'+item.phones_group_name+'</option>');
            }
        }
    });
 
    
    /*jQuery(".inputNomer .contactChooser").click(function(){
        jQuery(".inputNomer").css("display","none");
        jQuery(".selectContact").css("display","block");
    });
    jQuery(".selectContact .contactChooser").click(function(){
        jQuery(".inputNomer").css("display","block");
        jQuery(".selectContact").css("display","none");
    });*/    
    
    
    
    var options = {
        filter : "",
    };
    var fields = ["displayName", "phoneNumbers"];
    navigator.contacts.find(fields, function(contacts) {
        for (var key in contacts) {
            var user = contacts[key];
            for (var k in user.phoneNumbers) {
                var phone = user.phoneNumbers[k];
                jQuery("select[name=contact]").append('<option value="'+phone.value+'">'+user.displayName+' ('+phone.value+')</option>');
            }
        }
    }, function(error) {
        console.log(error);
    }, options);       
});