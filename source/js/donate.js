(function ($) {
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
            })(jQuery);
            
jQuery(document).ready(function() {
	$("#github").attr('href',$.getUrlParam('GitHub') ||  "https://github.com/"+window.location.href.split(".github.io")[0].split("/").pop())
	var QRBox	=	$('#QRBox');
	var MainBox	=	$('#MainBox');
	var AliPayQR	=	$.getUrlParam('AliPayQR') ||'../img/AliPayQR.png';
	var WeChatQR	=	$.getUrlParam('WeChatQR') ||'../img/WeChatQR.png';



	function showQR(QR) {
		if (QR) {
			MainBox.css('background-image','url('+QR+')');
		}
		$('#donateText,#donateBox,#github').addClass('blur');
		QRBox.fadeIn(300,function(argument) {
			MainBox.addClass('showQR');
		});
	}

	$('#donateBox>li').click(function(event) {
		var thisID	=	$(this).attr('id');
		if (thisID === 'AliPay') {
			showQR(AliPayQR);
		} else if (thisID === 'WeChat') {
			showQR(WeChatQR);
		}
	});

	MainBox.click(function(event) {
		MainBox.removeClass('showQR').addClass('hideQR');
		setTimeout (function(a) {
			QRBox.fadeOut(300,function(argument) {
				MainBox.removeClass('hideQR');
			});
			$('#donateText,#donateBox,#github').removeClass('blur');
		},600);

	});
});
