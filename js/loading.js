(function($) {
  function loading() {
    this.isShow = false;
    this.init = function() {
      $("body").append(
        '<!-- loading start -->\
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
      this.ele = $("#aLoading");
      this.word = $("#aLoadingWord");
      this.init = function() {};
    };
  }
  loading.prototype.turn = function(text) {
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
  loading.prototype.on = function(text) {
    if (this.isShow) {
    } else {
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
  loading.prototype.off = function() {
    if (this.isShow) {
      $(this.ele).fadeOut();
      this.isShow = false;
    } else {
    }
  };
  $.loading = new loading();
})(jQuery);