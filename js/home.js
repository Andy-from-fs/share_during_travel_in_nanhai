$(".region-bar .top").css("line-height", $(".region-bar").height() + "px");
$(".region-bar .top .icon-user").css(
  "line-height",
  $(".region-bar").height() + "px"
);

var isBarSwitch = false,
  _rule,
  _rankList,
  _detail;
function clickBtnRule() {
  if (typeof _rule === "undefined") {
    _rule = new ruleSingle();
  } else {
    _rule.turn();
  }
}
function clickBtnRegions() {
  if (isBarSwitch) {
    isBarSwitch = false;
    $(".top .icon-back").css({
      transform: "rotate(-90deg)"
    });
    $(".region-container").slideUp("normal");
  } else {
    isBarSwitch = true;
    $(".top .icon-back").css({
      transform: "rotate(90deg)"
    });
    $(".region-container").slideDown("normal");
  }
}
$("body")
  .on("click", "#region,.top .icon-back", clickBtnRegions)
  .on("click", ".rule", clickBtnRule);

(function($) {
  $.extend({
    single: function(fn) {
      var result;
      return function() {
        return result || (result = fn.apply(this, arguments));
      };
    }
  });
})(jQuery);

//排行榜
(function rankListPart() {
  var rankList = {
    isShow: false,
    rankListTurn: function() {
      var element = createRankList();
      if (!rankList.isShow) {
        //show
        $(element).css("display", "block");
        rankList.isShow = true;
      } else {
        //hide
        $(element).addClass("slideOutRight");
        setTimeout(function() {
          $(element)
            .removeClass("slideOutRight")
            .css("display", "none");
        }, 800);
        rankList.isShow = false;
      }
    }
  };
  var createRankList = $.single(function() {
    var html =
      ' <div id="rankList" class="animated slideInRight">\
          <div class="btn-group">\
            <span class="icon-back"></span>\
            <span class="title">排行榜</span>\
          </div>\
          <div class="list">\
            <div class="first three">\
              <span class="num">1</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/first.png" class="mask">\
                </div>\
                <div class="word">\
                  <div class="name">吃鸡</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="second three">\
              <span class="num">2</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/second.png" class="mask">\
                </div>\
                <div class="word">\
                  <div class="name">测试test测设test</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="third three">\
              <span class="num">3</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/third.png" class="mask">\
                </div>\
                <div class="word">\
                  <div class="name">测试test测设test</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="item">\
              <span class="num">4</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                </div>\
                <div class="word">\
                  <div class="name">测试test测设test</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="item">\
              <span class="num">5</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                </div>\
                <div class="word">\
                  <div class="name">测试test测设test</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="item">\
              <span class="num">6</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                </div>\
                <div class="word">\
                  <div class="name">测试test测设test</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="item">\
              <span class="num">7</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                </div>\
                <div class="word">\
                  <div class="name">测试test测设test</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="item">\
              <span class="num">8</span>\
              <div class="avatar-word">\
                <div class="avatar">\
                  <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatarImg">\
                </div>\
                <div class="word">\
                  <div class="name">测试test测设test</div>\
                  <div class="like-wrapper">\
                    <span class="icon-heart"></span>\
                    <span class="like-num">218000</span>\
                    <span>赞</span>\
                  </div>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>';
    var element = $(html).appendTo("body");
    $("body").on("click", "#rankList .icon-back,.title", rankList.rankListTurn);
    return element;
  });

  $("body").on("click", ".footer .rankList", rankList.rankListTurn);
})();

//活动规则
var ruleSingle = function() {
  function init() {
    var html =
      '<div id="game-rule" class="animated slideInLeft">\
        <div class="btn-group">\
          <span class="icon-back"></span>\
          <span>活动规则</span>\
          <a href="' +
      personalHomeUrl +
      '" class="icon-user"></a>\
        </div>\
        <div class="words">\
        </div>\
      </div>';
    $("body").append(html);
    $("#game-rule .words").append(gameRuleContent);
    $("#game-rule").css("display", "block");
  }
  init();
  ruleSingle = null;
  function initedObj() {
    var _this = this;
    this.isShow = true;
    this.turn = function() {
      if (!this.isShow) {
        this.isShow = true;
        $("#game-rule").css("display", "block");
      } else {
        this.isShow = false;
        $("#game-rule").addClass("slideOutLeft");
        setTimeout(function() {
          $("#game-rule").removeClass("slideOutLeft");
          $("#game-rule").css("display", "none");
        }, 800);
      }
    };
    function clickBtnBack() {
      _this.turn();
    }
    $("body").on("click", "#game-rule .icon-back", clickBtnBack);
  }
  return new initedObj();
};

// swal("Here's the title!", "...and here's the text!");

$("body").on("click", ".show-list .view", function() {
  console.log("click");
  $.detail.turn($(this).attr("viewId"));
});

