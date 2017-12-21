(function($) {
  function loading() {
    this.isShow = false;
    this.init = function() {
      $("body").append(
        '<!-- loading start -->\
        <div class="loading-wrap" id="loading-wrapper"></div>\
      <div class="loading" id="aLoading">\
        <div class="windows8">\
          <div class="wBall" id="wBall_1">\
            <div class="wInnerBall"></div>\
          </div>\
          <div class="wBall" id="wBall_2">\
            <div class="wInnerBall"></div>\
          </div>\
          <div class="wBall" id="wBall_3">\
            <div class="wInnerBall"></div>\
          </div>\
          <div class="wBall" id="wBall_4">\
            <div class="wInnerBall"></div>\
          </div>\
          <div class="wBall" id="wBall_5">\
            <div class="wInnerBall"></div>\
          </div>\
        </div>\
        <div>\
          <p class="word" id="aLoadingWord">\
            加载中\
          </p>\
        </div>\
      </div>\
      <!-- loading end -->'
      );
      function preventVerticalDraft(node) {
        $(node).on("touchstart", function() {
          $(node).on("touchmove", function(e) {
            var touch = e.originalEvent.targetTouches[0];
            var y = touch.pageY;
            var x = touch.pageX;
            if (x > 0 || y > 0) {
              e.stopPropagation();
              e.preventDefault();
            }
          });
        });
        $(node)
          .on("touchend", function() {
            $(node).off("touchmove");
          })
          .on("click", function() {
            e.stopPropagation();
            e.preventDefault();
          });
        return $(node);
      }
      this.ele = $("#aLoading");
      this.wrapper = $("#loading-wrapper");
      this.word = $("#aLoadingWord");
      preventVerticalDraft($(this.ele));
      this.init = function() {};
    };
  }
  loading.prototype.turn = function(text, isWrapper) {
    if (this.isShow) {
      this.off();
    } else {
      if (text) {
        this.on(text, isWrapper);
      } else {
        this.on();
      }
    }
  };
  loading.prototype.on = function(text, isWrapper) {
    if (this.isShow) {
    } else {
      this.init();
      if (text) {
        $(this.word).html(text);
      } else {
        $(this.word).html("加载中");
      }
      console.log(isWrapper);
      if (isWrapper) {
        $(this.wrapper).fadeIn();
        $(this.ele).addClass("transparent-bg");
      }
      $(this.ele).fadeIn();
      this.isShow = true;
    }
  };
  loading.prototype.off = function() {
    if (this.isShow) {
      $(this.ele)
        .fadeOut()
        .removeClass("transparent-bg");
      $(this.wrapper).fadeOut();
      this.isShow = false;
    }
  };
  $.extend({
    loading: new loading()
  });
})(jQuery);

(function($) {
  function bigLoading() {
    this.isShow = false;
    function single(fn) {
      var result;
      return function() {
        return result || (result = fn.apply(this, arguments));
      };
    }
    this.init = single(function() {
      var html =
        '<!-- big-loading start -->\
        <div id="big-loading">\
          <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/register-bg.jpg" width="100%" height="100%">\
          <p class="wrapper">\
            <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/Blocks.gif" width="33%"> \
            <span id="big-loading-word">加载中...</span>\
          </p>\
        </div>\
      <!-- big-loading end -->';
      var result = $(html).appendTo("body");
      function preventVerticalDraft(node) {
        $(node).on("touchstart", function() {
          $(node).on("touchmove", function(e) {
            var touch = e.originalEvent.targetTouches[0];
            var y = touch.pageY;
            var x = touch.pageX;
            if (x > 0 || y > 0) {
              e.stopPropagation();
              e.preventDefault();
            }
          });
        });
        $(node)
          .on("touchend", function() {
            $(node).off("touchmove");
          })
          .on("click", function() {
            e.stopPropagation();
            e.preventDefault();
          });
        return $(node);
      }
      this.ele = $("#big-loading");
      this.word = $("#big-loading-word");
      preventVerticalDraft($(this.ele));
      return result;
    });
  }
  bigLoading.prototype.turn = function(text) {
    if (this.isShow) {
      this.off();
    } else {
      if (text) {
        this.on(text);
      } else {
        this.on();
      }
    }
  };
  bigLoading.prototype.on = function(text) {
    if (!this.isShow) {
      this.init();
      if (text) {
        $(this.word).html(text);
      } else {
        $(this.word).html("加载中");
      }
      $(this.ele).fadeIn();
      this.isShow = true;
    }
  };
  bigLoading.prototype.off = function() {
    if (this.isShow) {
      $(this.ele).fadeOut();
      this.isShow = false;
    }
  };
  $.extend({
    bigLoading: new bigLoading()
  });
})(jQuery);
