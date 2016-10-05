/*
    Twitter Original Image Linker
    Author : IGAWA, Seizo.
    Licence : MIT Licence
*/
$(function(){    
    //原寸画像のリンクを生成する・表示する
    $(document.body).on("mouseover", "div.AdaptiveMedia-container", function() {
        var $rootDom = $(this);
        if($rootDom.find("div.AdaptiveMedia-photoContainer").length === 0) return;        
        // div.AdaptiveMedia-singlePhoto

        var $linker = $rootDom.find("div.org_image_url");
        
        if($linker.length === 0) {
             //原寸画像のリンクDIVがなかったら解析して生成
             var linkText = "";
             var cnt = 0;

             $rootDom.find("div.AdaptiveMedia-photoContainer").each(function () {
                  var src = $(this).attr("data-image-url");
                  linkText += createLinkText(src, cnt);
                  cnt++;
             });
         
             $rootDom.prepend(createLinkContainer(linkText));
        } else {
            //原寸画像のリンクDIVがあったら再表示
            $linker.show();
        }
    });

    //原寸画像のリンクを隠す
    $(document.body).on("mouseout", "div.AdaptiveMedia-container", function() {
        $(this).find("div.org_image_url").hide();
    });
});

function createLinkContainer (text) {
    return '<div class="org_image_url" style="position:absolute; top : 0; left : 0; background-color : hsl(0, 0%, 100%); opacity : 0.9; z-index : 10; min-width : 100%; padding : 0.2em; text-align : center;">原寸画像：' + text + '</div>'
}

//現行の投稿枚数は4枚まで（H28-10-06現在）
var circleNumberList = ["①", "②","③","④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

function createLinkText (src, cnt) {  
    return  '<a href="' + src + ':orig" style="margin-right : 1em;">' + circleNumberList[cnt] +'枚目</a>';
}