$(document).ready(function () {
    var QRBox = $('#QRBox');
    var MainBox = $('#MainBox');
    function showQR(QR) {
        if (QR) {
            MainBox.css('background-image', 'url(' + QR + ')');
        }
        $('#DonateText,#donateBox,#github').addClass('blur');
        QRBox.fadeIn(300, function (argument) {
            MainBox.addClass('showQR');
        });
    }

    $('#donateBox>li').click(function (event) {
        var thisQR = $(this).attr('qr');
        if (thisQR) {
            showQR(thisQR);
        }
    });
    MainBox.click(function (event) {
        MainBox.removeClass('showQR').addClass('hideQR');
        setTimeout(function (a) {
            QRBox.fadeOut(300, function (argument) {
                MainBox.removeClass('hideQR');
            });
            $('#DonateText,#donateBox,#github').removeClass('blur');
        }, 600);
    });
});

!function (e, t, a) {
    var script = document.currentScript || (function () {
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1]
    })()
    var successText = $(script).attr("successtext")
    var clipboard = new ClipboardJS('#BTC');
    clipboard.on('success',
        function (e) {
            console.log(successText)
            if (successText) {
                toastr.options = {
                    "positionClass": "toast-top-center",
                    "timeOut": "1000",
                }
                toastr.success(successText)
            }
        });
}(window, document);