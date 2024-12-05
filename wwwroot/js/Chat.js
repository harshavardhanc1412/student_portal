var chat;

$(document).ready(function () {
    chat = $("#chat").kendoChat({
        toolClick: function (ev) {
            if (ev.name === "sendimage") {
                $("#files").click();
            }
        },
        toolbar: {
            toggleable: true,
            buttons: [
                { name: "sendimage", iconClass: "k-icon k-i-image" }
            ]
        }
    }).data("kendoChat");

    var upload = $("#files").kendoUpload({
        async: {
            saveUrl: "../upload/save",
            removeUrl: "../upload/remove",
            autoUpload: true
        },
        validation: {
            allowedExtensions: [".jpg", ".jpeg", ".png", ".bmp", ".gif"]
        },
        success: onSuccess,
        showFileList: false,
        dropZone: "#chat"
    }).data("kendoUpload");

   
});

function onSuccess(e) {
    if (e.operation === "upload") {
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i].rawFile;

            if (file) {
                var reader = new FileReader();

                reader.onloadend = function () {
                    chat.renderAttachments({
                        attachments: [{
                            contentType: "image_card",
                            content: {
                                image: this.result
                            }
                        }],
                        attachmentLayout: "list"
                    }, chat.getUser());
                };

                reader.readAsDataURL(file);
            }
        }
    }
}

var IMAGE_CARD_TEMPLATE = kendo.template(
    '<div class="k-card k-card-type-rich">' +
    '<div class="k-card-body quoteCard">' +
    '<img alt="Kendo UI for jQuery Chat Toolbar Custom Tool Image" class="image-attachment" src="#: image #" />' +
    '</div>' +
    '</div>'
);

kendo.chat.registerTemplate("image_card", IMAGE_CARD_TEMPLATE);