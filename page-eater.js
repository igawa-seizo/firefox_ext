$(function(){
    var src = "";
    $(document.body).on("mouseover", "div.AdaptiveMedia-photoContainer", function() {
        src = $(this).attr("data-image-url");
        console.info(src);
        $(this).append('<div class="orig_image_url"><a href=' + src + ':orig>�����摜��\������</a></div>');
    });
});