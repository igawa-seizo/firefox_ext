$(function(){
    
    //原寸画像のリンクを表示する
    $(document.body).on("mouseover", "div.AdaptiveMedia-photoContainer", function() {
        

        var attatchDom = "";
        var imgCnt = $(this).parents("div.AdaptiveMedia-singlePhoto").length;
        if(imgCnt === 1) {
            $rootDom = $(this);
    
            var $linker = $(this).find("div.org_image_url");
            var src = $(this).attr("data-image-url");
            if($linker.length === 0) {
                 $rootDom.prepend('<div class="org_image_url" style="position:absolute; top : 0; left : 0; background-color : hsl(0, 0%, 100%); opacity : 0.9; z-index : 10; min-width : 100%; text-align : center;"><a href=' + src + ':orig>原寸画像を表示する</a></div>');
            } else {
                $linker.show();
            }
                    
            console.info(src);
            console.info($linker.length);
        } else {
            $rootDom = $(this).parents("div.AdaptiveMedia-container");
            
            var $linker = $rootDom.find("div.org_image_url");
            var src = $(this).attr("data-image-url");
            if($linker.length === 0) {
                 var linkText = "";
                 var cnt = 0;
                 var circleNumber = ["①", "②","③","④","⑤","⑥","⑦", "⑧", "⑨", "⑩"];
                 
                 $rootDom.find("div.AdaptiveMedia-photoContainer").each(function () {
                      var src = $(this).attr("data-image-url");
                      linkText += '<a href=' + src + ':orig>' + circleNumber[cnt] +'枚目</a>　';
                      cnt++;
                 });
                 $rootDom.prepend('<div class="org_image_url" style="position:absolute; top : 0; left : 0; background-color : hsl(0, 0%, 100%); opacity : 0.9; z-index : 10; min-width : 100%;">元画像：' + linkText + '</div>');
            } else {
                $linker.show();
            }
                    
            console.info(src);
            console.info($linker.length);
        }
        


    });

    //原寸画像のリンクを表示する（ポップアップウィンドウ）
    /*$(document.body).on("mouseover", "img.media-large", function() {
        var src = $(this).attr("src");
        
        var re = new RegExp("(.+?)(:large)", "g");
        var reArray = re.exec(src); 
        var nativeURL = reArray[1];
        
        var $linker = $(this).find("div.org_image_url");
        console.info(src);
        console.info($linker.length);
        if($linker.length === 0) {
            $(this).prepend('<div class="org_image_url" style="position:absolute; top : 0; left : 0; background-color : hsl(0, 0%, 100%); opacity : 0.9; z-index : 10; min-width : 100%; text-align : center;"><a href=' + nativeURL + ':orig>原寸画像を表示する</a></div>');
        } else {
            $linker.show();
        }
    });*/

    //原寸画像のリンクを隠す
    $(document.body).on("mouseout", "div.AdaptiveMedia-container", function() {
        var imgCnt = $(this).find("div.AdaptiveMedia-singlePhoto").length;
        if(imgCnt === 1) {
            $(this).find("div.org_image_url").hide();
        }
    });

});