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
      if (text === "font") {
        $(this).removeClass("has-like");
      }
      return $(this);
    },
    //恢复未点赞
    withoutLike: function(text, onclick) {
      $(this)
        .removeClass("has-like like-on")
        .on("click", onclick);
      if (text === "font") {
        $(this).addClass("has-like");
      }
      return $(this);
    },
    //屏蔽上下滑动节点上下滑动事件
    preventVerticalDraft: function() {
      $(this).on("touchstart", function() {
        $(this).on("touchmove", function(e) {
          var touch = e.originalEvent.targetTouches[0];
          var y = touch.pageY;
          var x = touch.pageX;
          if (x > 0 || y > 0) {
            e.stopPropagation();
            e.preventDefault();
          }
        });
      });
      $(this).on("touchend", function() {
        $(this).off("touchmove");
      });
      return $(this);
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

Array.prototype.max = function() {
  var max = this[0];
  var len = this.length;
  for (var i = 1; i < len; i++) {
    if (this[i] > max) {
      max = this[i];
    }
  }
  return max;
};
