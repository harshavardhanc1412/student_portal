(function () {
    $(document).ready(function () {
       
        var isSubscribed = false;

        
        $('#isSubscribed').click(function () {
            isSubscribed = $(this).is(':checked');
        });

        
        $("#SearchBtn").click(function () {
            var SearchValue = $("#Search").val();
            bindStudentsData(SearchValue, isSubscribed);
        });

        
        bindStudentsData();
    });

    function bindStudentsData(SearchValue = "", isSubscribed = false) {
        $.ajax({
            type: "Get",
            url: "/Home/SearchAjaxResult",
            data: { SearchValue: SearchValue, isSubscribed: isSubscribed},
            success: function (result) {
                $("#DataSearching").html("");
                result.forEach((i) => {
                    $("#DataSearching").append(`<tr>
                                <td style="border: 1px solid black;">${i.id}</td>
                                <td style="border: 1px solid black;">${i.name}</td>
                                <td style="border: 1px solid black;">${i.email}</td>
                                <td style="border: 1px solid black;">${i.phone}</td>
                                <td style="border: 1px solid black;">${i.subscribed}</td>
                                <td style="border: 1px solid black;">${i.hobby}</td>
                            </tr>`);
                });
            },
            error: function (er) {
                console.log(er);
                $("#DataSearching").empty();
                $("#DataSearching").append('<tr style="color:red"><td colspan="5">An error occurred while fetching data.</td></tr>');
            }
        });
    }
})();
