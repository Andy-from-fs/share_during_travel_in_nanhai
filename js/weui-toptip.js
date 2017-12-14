(function($) {
  "use strict";

  var timeout;

  $.toptip = function(text, duration, type) {
    if(!text) return;
    if(typeof duration === typeof "a") {
      type = duration;
      duration = undefined;
    }
    duration = duration || 3000;
    var className = type ? 'bg-' + type : 'bg-success';
    $('.weui-toptips').remove();
    $('<div class="weui-toptips" id="weui-toptips"></div>').appendTo(document.body).html(text).addClass(className);
    var $t=$('#weui-toptips');
    clearTimeout(timeout);

    if(!$t.hasClass('weui-toptips_visible')) {
      $t.show();
      $t.addClass('weui-toptips_visible');
    }

    timeout = setTimeout(function() {
      $t.removeClass('weui-toptips_visible')
      setTimeout(function() {
        $t.remove();
      },300);
    }, duration);
  }
})(jQuery);