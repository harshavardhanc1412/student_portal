$(document).ready(function () {
    var grid = $("#grid").kendoGrid({
        pdf: {
            allPages: true,
            paperSize: "A4",
            landscape: true,
            scale: 0.75
        },
        excel: {
            allPages: true
        },
        dataSource: {
            transport: {
                read: {
                    url: "/Student/GetList",
                    type: "GET",
                    dataType: "json"
                },
                create: {
                    url: "/Student/Add",
                    type: "POST",
                    dataType: "json"
                },
                update: {
                    url: function (data) {
                        return "/Student/Edit/" + data.id;
                    },
                    type: "POST",
                    dataType: "json",
                    complete: function () {
                        $("#grid").data("kendoGrid").dataSource.read(); // Refresh grid after update
                    }
                },

                destroy: {
                    url: "/Student/Delete",
                    type: "POST",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: 'id',
                    fields: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        subscribed: { type: "boolean" },
                        hobby: { type: "string" },
                        image: { type: "string" },
                    }
                }
            }
        },
        columns: [
            { field: "id", title: "Id", exportable: { pdf: false, excel: false } },
            { field: "name", title: "Name" },
            { field: "email", title: "Email", width: "255px" },
            { field: "phone", title: "Phone" },
            { field: "subscribed", title: "Subscribed" },
            { field: "hobby", title: "Hobby" },
            {
                field: "image",
                title: "Image",
                template: "<img src='#= image #' style='width:100px; height:100px;' />"
            },
            { template: "#= email # (#= phone #)", title: "Email (Phone)", width: "260px", hidden: true, exportable: { pdf: true, excel: false } },
            { command: [{ name: "view", text: "View", imageClass: "k-icon k-i-eye", click: viewDetails }, { name: "geneerate", text: "Generate", click: generatePDF }, "edit", "destroy"], title: "Actions", exportable: { pdf: false, excel: false } }
        ],
        editable: {
            mode: "popup",
            template: kendo.template(
                `<div class="k-edit-label"><label for="Name">Name</label></div>
            <div class="k-edit-field"><input type="text" data-bind="value:name" name="Name" /></div>

            <div class="k-edit-label"><label for="Email">Email</label></div>
            <div class="k-edit-field"><input type="email" data-bind="value:email" name="Email" /></div>

            <div class="k-edit-label"><label for="Phone">Phone</label></div>
            <div class="k-edit-field"><input type="text" data-bind="value:phone" name="Phone" /></div>

            <div class="k-edit-label"><label for="Subscribed">Subscribed</label></div>
            <div class="k-edit-field"><input type="checkbox" data-bind="checked:subscribed" name="Subscribed" /></div>

            <div class="k-edit-label"><label for="Hobby">Hobby</label></div>
            <div class="k-edit-field"><input type="text" data-bind="value:hobby" name="Hobby" /></div>

            <div class="k-edit-label"><label for="Image">Image</label></div>
            <div class="k-edit-field">
                <input type="file" id="img" />
                <img id="img1" src="#= image #" style="width: 100px; height: 100px; margin-top: 10px;" />
            </div>`
            )
        },
        dataBound: function () {
            console.log("Grid refreshed with latest data.");
        },
        sortable: true,
        toolbar: [
            { name: "create", text: "Add Student" },
            { name: "pdf", text: "Export PDF" },
            { name: "search", text: "Search" }
        ],
        groupable: true,
        scrollable: true,
        filterable: true,
        pageable: {
            pageSizes: [10]
        }
    }).data("kendoGrid");

    grid.bind("dataBound", function () {
        console.log("Grid refreshed with latest data.");
    });

    // Initialize the details window
    $("#detailsWindow").kendoWindow({
        width: "350px",
        title: "Student Details",
        visible: false,
        modal: true,
        actions: [
            "Minimize",
            "Maximize",
            "Close"
        ]
    });

    var detailsWindow = $("#detailsWindow").data("kendoWindow");

    // View details function
    function viewDetails(e) {
        e.preventDefault();
        var row = $(e.currentTarget).closest("tr");
        var dataItem = grid.dataItem(row);
        var content = `
            <div class="modal-dialog-centered">
                <div class="modal-body-centered">
                    <h3>Student Details</h3><br/>
                    <p><strong>Name:</strong> ${dataItem.name}</p>
                    <p><strong>Email:</strong> ${dataItem.email}</p>
                    <p><strong>Phone:</strong> ${dataItem.phone}</p>
                    <p><strong>Subscribed:</strong> ${dataItem.subscribed ? 'Yes' : 'No'}</p>
                    <p><strong>Hobby:</strong> ${dataItem.hobby}</p><br/>
                    <p><strong>Image:</strong></p>
                    <img src="${dataItem.image}" alt="Student Image" style="max-width: 50%; height: 50%;"/><br/><br/><br/>
                    <button type="submit" id="sendMailBtn" class="btn btn-primary">Send Mail</button>
                </div>

            </div>
        `;

        detailsWindow.content(content).center().open();

        // Bind the send mail button click event
        $('#sendMailBtn').off('click').on('click', function () {
            sendMail(dataItem);
        });
    }

    // Function to send mail
    function sendMail(dataItem) {
        $.ajax({
            url: '/Home/SendGridMail',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: dataItem.name,
                email: dataItem.email,
                phone: dataItem.phone,
                subscribed: dataItem.subscribed,
                hobby: dataItem.hobby,
                image: dataItem.image
            }),
            success: function () {
                alert('Mail sent successfully');
            },
            error: function (xhr, status, error) {
                alert('An error occurred while sending the mail: ' + error);
            }
        });
    }
    function generatePDF(e) {
        e.preventDefault();
        var row = $(e.currentTarget).closest("tr");
        var dataItem = grid.dataItem(row);
        var additionalContent = `
       <div style="position: relative; text-align: center; padding: 20px;">
            <!-- Student Image at Top Right with Border -->
            <img src="${dataItem.image}" 
                 alt="Student Image" 
                 style="position: absolute; top: 20px; right: 20px; max-width: 5%; height: 5%; border: 2px solid black; padding: 5px;"/>

            <!-- Certificate Content -->
            <h1>Certificate of Achievement</h1>
            <h2>This is to certify that</h2>
            <h2><strong>${dataItem.name}</strong></h2>
            <p>has the Hobby</p>
            <p><strong>${dataItem.hobby}</strong></p>
            <p>Date of Completion: <strong>${kendo.toString(new Date(), "dd/MM/yyyy")}</strong></p>

            <p>________________________________________________________________________________</p>
            <p><strong>Harsha</strong></p>
            <p>Founder</p>
            <p>Student Portal</p>
            <p>
                <img src="https://as2.ftcdn.net/v2/jpg/02/66/27/63/1000_F_266276341_h21NmpmCsd6TxPkNtZ31xA7LwMYRSoZ0.jpg" 
                     alt="Signature" 
                     height="100" 
                     width="100" />
            </p>
        </div>


    `;

        kendo.drawing.drawDOM($("#generateCertificate"), {
            paperSize: "A4",
            landscape: true,
            margin: {
                top: 50,
                left: 20,
                right: 20,
                bottom: 20
            },
            template: additionalContent
        }).then(function (group) {
            return kendo.drawing.exportPDF(group);
        }).done(function (data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "StudentCertificate.pdf",
                proxyURL: "//demos.telerik.com/kendo-ui/service/export" 
            });
        });
    }


    // Search button functionality
    $('#searchbtn').on('click', function (event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var Subs_dd = $('#subs_dd').val();
        var Hobby = $('#hobbies_dd option:selected').text();

        $.ajax({
            url: '/Student/GetList1',
            type: 'GET',
            data: {
                name: name,
                email: email,
                phone: phone,
                subscribed: Subs_dd,
                hobby: Hobby
            },
            success: function (response) {
                // Update the Grid's dataSource
                grid.dataSource.data(response);
            },
            error: function (xhr, status, error) {
                alert('An error occurred: ' + error);
            }
        });
    });
});



// Handle Image upload
$(document).on("change", "#img", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Clear the previous image preview if any
            $("#img").attr("src", '');

            // Set the new image preview
            $("#img1").attr("src", e.target.result);

            // Update the data model with the new base64 image
            const grid = $("#grid").data("kendoGrid");
            const dataItem = grid.dataItem(".k-grid-edit-row");
            if (dataItem) {
                // Set the new base64 image to the Image field
                dataItem.set("Image", e.target.result); // This updates the model with the new image
            }
        };
        reader.readAsDataURL(file);
    }
});


$("#grid").on("click", ".k-grid-edit", function () {
    const row = $(this).closest("tr");
    const grid = $("#grid").data("kendoGrid");
    const dataItem = grid.dataItem(row);

    // Set the preview image in the popup editor
    if (dataItem && dataItem.image) {
        $("#img1").attr("src", dataItem.image);
    } else {
        $("#img1").attr("src", ""); // Clear the image if none exists
    }
});

