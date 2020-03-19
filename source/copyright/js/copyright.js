!function (e, t, a) {
    new ClipboardJS('.fa-clipboard');
    $(".fa-clipboard").click(function () {
        console.log("复制")
        clipboard.on('success', function () {

        });
    });
}(window, document);