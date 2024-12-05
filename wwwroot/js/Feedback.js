 $(function () {
       
    $("#feedback").click(function () {
            var con = { };
    con.Name = $("#StudentName").val();
    std.studentAddress = $("#StudentAddress").val();
    $.ajax({
        type: "POST",
    url: '@Url.Action("createStudent")',
    data: '{std: ' + JSON.stringify(std) + '}',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function () {
        // alert("Data has been added successfully.");
        LoadData();
                },
    error: function () {
        alert("Error while inserting data");
                }
            });
    return false;
        });
    });