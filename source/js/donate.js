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
        var thisID = $(this).attr('id');
        var thisQR = $(this).attr('qr');
        if (thisID === 'BTC') {
            new Clipboard('#BTCBn');
        }
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

