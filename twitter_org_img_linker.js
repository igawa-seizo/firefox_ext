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
       
        if($linker.length > 0) {
             //原寸画像のリンクDIVがあったら再表示
            $linker.show();
            return;
        }
    
         //原寸画像のリンクDIVがなかったら解析して生成
         var num = $rootDom.find("div.AdaptiveMedia-photoContainer").length;
         var $linkCtr = createLinkContainer();
         
         var cnt = 0;
         $rootDom.find("div.AdaptiveMedia-photoContainer").each(function () {
              var src = $(this).attr("data-image-url");
              $linkCtr.append(createLinkText(src, cnt));
              cnt++;
         });
     
        $linkCtr.append(createSwapText());
        $rootDom.prepend($linkCtr);
    });

    //原寸画像を表示する
    $(document.body).on("click", "a.show_org_image", function() {
        //既に表示されたる画像ビューワは消去
        $("div.org_image_viewer").remove();
        
        var idx = parseInt($(this).attr("data-index"));
        
        var orgLinks = [];
        var $linkCtr = $(this).parents("div.org_image_url");
        $linkCtr.find("a.show_org_image").each(function () {
            orgLinks.push($(this).attr("data-href"));
        });
        
        var $dom = createOriginalImageViewer (orgLinks, idx);
        
        $(document.body).prepend($dom);
    }); 

    //原寸画像ビューワを消す
    $(document.body).on("click", "span.del_image_viewer", function() {     
        $(this).parents("div.org_image_viewer").remove();
    });

    //次へ、前への指示
    $(document.body).on("click", "span.next_image, span.prev_image", function() {
           var $imageViewer = $(this).parents("div.org_image_viewer");
           var maxIdx = parseInt($imageViewer.attr("data-org-link-max-num"));
           if(maxIdx === 0) return;
           
           var newIdx = parseInt($imageViewer.attr("data-current-idx"));
           if( $(this).hasClass("prev_image") === true ) {
               if(--newIdx < 0) newIdx = maxIdx;
           } else {
               if(++newIdx > maxIdx) newIdx = 0;
           }

           $imageViewer.attr("data-current-idx", newIdx);
           $imageViewer.find("img").attr("src", $imageViewer.attr("data-org-link-" + newIdx));
    }); 

    //表示画像を全て原寸に差し替える
    $(document.body).on("click", ".load_all_org_image", function() {       
        var orgLinks = [];
        var $linkCtr = $(this).parents("div.org_image_url");
        $linkCtr.find("a.show_org_image").each(function () {
            orgLinks.push($(this).attr("data-href"));
        });
        var $rootDom = $(this).parents("div.AdaptiveMedia-container");
        
        var idx = 0;
        //src要素を書換
        $rootDom.find("div.AdaptiveMedia-photoContainer").each(function () {
            $(this).find("img").attr("src", orgLinks[idx++]);
        });
    
        $(this).hide();
    }); 

    //原寸画像のリンクを隠す
    $(document.body).on("mouseout", "div.tweet", function() {
        $(this).find("div.org_image_url").hide();
    });
});

function createLinkContainer () {
    var $div = $("<div></div>");
    $div.addClass("org_image_url").css({
        "position" : "absolute",
        "top" : 0,
        "left" : 0,
        "background-color" : "hsl(0, 0%, 100%)",
        "opacity" : 0.9,
        "z-index" : 10,
        "min-width" : "100%",
        "padding" : "0.2em",
        "text-align" : "center"
    });
    return $div;
}

//現行の投稿枚数は4枚まで（H28-10-06現在）
var circleNumberList = ["①", "②","③","④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

function createLinkText (src, cnt) {
    var re = RegExp(".+\/(.+?)$", "g");
    var result = re.exec(src);
    var filename = result[1];
    
    var target = src + ":orig";
    
    var $span = $("<span></span>");
    $span.css("margin-right", "1em").text(circleNumberList[cnt]);
    
    var $showIcon = '<svg style="vertical-align:middle;" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"/></svg>';
    
    var $showA = $("<a></a>");
    $showA.addClass("show_org_image").attr("data-index", cnt).attr("data-href", target).attr("download", filename).css("margin-right", "0.5em").append($showIcon);
    
    var $dom = $span.append($showA);
    return  $dom;
}

function createSwapText () {
    var $swapIcon = '<svg style="vertical-align:middle;" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 4l-4 4h3v7c0 1.1-.9 2-2 2s-2-.9-2-2V8c0-2.21-1.79-4-4-4S5 5.79 5 8v7H2l4 4 4-4H7V8c0-1.1.9-2 2-2s2 .9 2 2v7c0 2.21 1.79 4 4 4s4-1.79 4-4V8h3l-4-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var $changeA = $("<a></a>").append($swapIcon);
    var $span = $("<span></span>").addClass("load_all_org_image").append($changeA);
    return $span;
}

function createOriginalImageViewer (origLinks, idx) {
    var $div = $("<div></div>");
    
    var top = $(window).scrollTop() + 0.1 * $(window).height();
    
    $div.addClass("org_image_viewer").css({
        "position" : "absolute",
        "top" : top,
        "left" : "25%",
        "background-color" : "hsl(200, 70%, 70%)",
        "z-index" : 1024,
        "height"  : "auto",
        "width" : "50%",
        "max-width" : "50%",
        "padding" : "0.5em",
        "border-radius" : "3px",
        "text-align" : "center"
    });

    origLinks.forEach(function (elm, idx) {
        $div.attr("data-org-link-" + idx, elm);
    });
    $div.attr("data-org-link-max-num", origLinks.length - 1).attr("data-current-idx", idx);

    var $imgCtr = $("<div></div>").css({
        "width" : "100%",
        "height"  : "100%",
    });
    var $img = $("<img>");
    $img.addClass("org_image").attr("src", origLinks[idx]).css({
        "position" : "relative",
        "width" : "100%",
        "height" : "auto",
        "max-width" : "100%"
    });

    var $p = $("<p></p>").css({
        "padding" : "0.5em",
        "text-align" : "center"
    });
    $imgCtr.append($p).append($img);
    
    var leftIcon = '<svg style="vertical-align:middle;" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var $left  = $("<span></span>").css({"cursor" : "pointer", "margin-right" : "2em"}).addClass("prev_image").append(leftIcon);

    var closeIcon = '<svg style="vertical-align:middle;" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var $close = $("<span></span>").css({"cursor" : "pointer"}).addClass("del_image_viewer").append(closeIcon);

    var rightIcon = '<svg style="vertical-align:middle;" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
    var $right = $("<span></span>").css({"cursor" : "pointer", "margin-left" : "2em"}).addClass("next_image").append(rightIcon);

    $p.append($left).append($close).append($right);

    return  $div.append($imgCtr);
}