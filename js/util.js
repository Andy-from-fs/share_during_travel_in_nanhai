(function($) {
  $.extend({
    //惰性单例模式
    singleton: function(fn) {
      var result;
      return function() {
        return result || (result = fn.apply(this, arguments));
      };
    },
    //节流函数
    throttle: function(fn, delay) {
      var timer = null;
      return function() {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    }
  });
  $.fn.extend({
    //点赞后
    disHasLike: function(text) {
      $(this)
        .addClass("has-like like-on")
        .off("click");
      if(text==='font'){
        $(this).removeClass("has-like");
      }
    }
  });
})(jQuery);

//获取图片完整路径
function tomedia(src, thumbnail, quality) {
  if (typeof thumbnail !== "string") {
    thumbnail = "300x";
  }
  if (
    (typeof quality != "Number" && typeof quality != "string") ||
    parseInt(quality) > 100
  ) {
    quality = 60;
  }
  // console.log(thumbnail);
  // console.log(quality);
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
      "?imageMogr2/auto-orient/strip/thumbnail/" +
      thumbnail +
      "/quality/" +
      quality +
      "!"
    );
  }
}

//电话正则
var checkPhoneReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

//拆分时间,返回json-obj
function splitTimeStr(timeStr) {
  var data_time = timeStr.split(" "),
    data = data_time[0].split("-"),
    time = data_time[1].split(":");
  return {
    origin: timeStr,
    data: data_time[0],
    time: data_time[1],
    year: data[0],
    month: data[1],
    day: data[2]
  };
}
