//惰性单例模式
(function($) {
  $.extend({
    singleton: function(fn) {
      var result;
      return function() {
        return result || (result = fn.apply(this, arguments));
      };
    }
  });
})(jQuery);

//获取图片完整路径
function tomedia(src) {
  if (typeof src != "string") return "";
  if (src.indexOf("http://") == 0 || src.indexOf("https://") == 0) {
    return src;
  } else if (
    src.indexOf("../addons") == 0 ||
    src.indexOf("../attachment") == 0
  ) {
    src = src.substr(3);
    return "http://we.citygf.com/wewewe/" + src;
  } else if (src.indexOf("./resource") == 0) {
    src = src.substr(2);
    return "http://we.citygf.com/wewewe/app/" + src;
  } else if (src.indexOf("images/") == 0) {
    var imgurl1 = "http://we.citygf.com/wewewe/attachment/" + src;
    var pos1 = imgurl1.lastIndexOf(".");
    var imgurl2 = imgurl1.substring(0, pos1);
    var imgtype = imgurl1.substring(pos1, imgurl1.length);
    var imgurl = imgurl2 + "_s" + imgtype;
    return imgurl;
  } else if (src.indexOf("tencent/") == 0) {
    var imgurl1 = src;
    var pos1 = imgurl1.indexOf("/");
    var imgurl = imgurl1.substring(pos1, imgurl1.length);
    return (
      "http://we7-1253788256.image.myqcloud.com" +
      imgurl +
      "?imageMogr2/auto-orient/strip/thumbnail/300x/quality/60!"
    );
  }
}