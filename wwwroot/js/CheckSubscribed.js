$(document).ready(function () {
    function loadSubscribers(isSubscribed) {
        console.log('Loading subscribers with isSubscribed:', isSubscribed);
        $.ajax({
            url: '/Home/CheckSubscribedResult',
            type: 'GET',
            data: { isSubscribed: isSubscribed },
            success: function (result) {
                $("#DataSearching").html("");
                result.forEach((i, v) => {
                    $("#DataSearching").append(`<tr>
                                <td style="border: 1px solid black;">${i.id}</td>
                                <td style="border: 1px solid black;">${i.name}</td>
                                <td style="border: 1px solid black;">${i.email}</td>
                                <td style="border: 1px solid black;">${i.phone}</td>
                                <td style="border: 1px solid black;">${i.subscribed}</td>
                                <td style="border: 1px solid black;">${i.hobby}</td>
                            </tr>`)
                })
            },
            error: function (er) {
                console.log(er);
                $("#DataSearching").empty();
                $("#DataSearching").append('<tr style="color:red"><td colspan="5">An error occurred while fetching data.</td></tr>');
            }
        });
    }
    loadSubscribers();

    $('#isSubscribed').click(function () {
        var isSubscribed = $(this).is(':checked');
        loadSubscribers(isSubscribed);
    });
});
