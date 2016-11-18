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
});