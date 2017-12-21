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

//排行榜
(function rankListPart() {
  var rankList = {
    isShow: false,
    turn: function() {
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
  var createRankList = $.singleton(function() {
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
    $("body").on("click", "#rankList .icon-back,.title", rankList.turn);
    return element;
  });

  $("body").on("click", ".footer .rankList", rankList.turn);
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

$("body").on("click", "#all .view", function() {
  // console.log("click");
  var enterArr,
    id = $(this).attr("shareid");
  $.each(all.shareList, function(indexInArray, valueOfElement) {
    if (valueOfElement.id == id) {
      enterArr = valueOfElement;
    }
  });
  console.log(enterArr);

  $.detail.turn(enterArr);
  setTimeout(function() {
    var display = $(".footer").css("display");
    $(".footer").css("display", "none");
    var showFooter = function() {
      $(".footer").css("display", display);
    };
    $("body").on("click", "#detail .btn-back", showFooter);
  }, 800);
});

//分享内容获取
var all = {
  psize: 10,
  page: 0,
  shareList: [],
  isEnd: false
};
var getShare = function(data) {
  $.ajax({
    type: "post",
    url: getShareApi,
    data: data,
    dataType: "json",
    success: function(response) {
      console.log(response);
      if (response.statusCode === "200") {
        //检查是否到底
        if (response.data.length < all.psize) {
          shareEnd("all");
          all.isEnd = true;
        }
        insertShare(response, "#all", all.shareList);
      } else if (response.msg === "没有记录") {
        shareEnd("all");
      }
    }
  });
};
function insertShare(response, wrapperSelector, shareList) {
        $.each(response.data, function(indexInArray, valueOfElement) {
          shareList.push(valueOfElement);
          //检查点赞 insert

          var timeObj = splitTimeStr(valueOfElement.createtime);
          var html =
            '<div class="view" shareid="' +
            valueOfElement.id +
            '">\
         <img src="' +
            tomedia(valueOfElement.image.split(",")[0]) +
            '" width="100%">\
         <div class="info">\
           <div class="location">' +
            valueOfElement.address +
            '</div>\
           <div class="like-time">\
             <div class="time">' +
            timeObj.month +
            "-" +
            timeObj.day +
            '</div>\
             <div class="like" shareid="' +
            valueOfElement.id +
            '">\
               <span class="like-num">' +
            valueOfElement.star +
            '</span>\
               <span class="icon-heart"></span>\
             </div>\
           </div>\
         </div>\
       </div>';
          var wayClass = (indexInArray + 1) % 2 === 1 ? "_left" : "_right";
    $(html).appendTo(wrapperSelector + " ." + wayClass);
        });
  $(wrapperSelector + " .like").on("click", function(e) {
    clickLike.call(this, "font");
    $(this)
      .children(".like-num")
      .html(
        parseInt(
          $(this)
            .children(".like-num")
            .html()
        ) + 1
      );
          e.preventDefault();
          e.stopPropagation();
        });
        $.each(likeList, function(indexInArray, valueOfElement) {
    $(
      wrapperSelector + ' .like[shareid="' + valueOfElement + '"]'
    ).disHasLike();
        });
      }

checkLike(getShare, [
  {
    psize: all.psize,
    page: ++all.page
  }
]);

//上拉加载
var loadMoreInAll = $.throttle(function() {
    var winScrollTop = $(window).scrollTop();
    var percent = winScrollTop / ($("body").outerHeight() - $(window).height());
  if (percent > 0.7 && !all.isEnd) {
      console.log("加载更多");
      getShare({
      psize: all.psize,
      page: ++all.page
      });
    }
}, 300);
$(window).scroll(loadMoreInAll);

//到底处理
function shareEnd(wrapperText) {
  $("#" + wrapperText + " .situation").html("到底了~");
}

//获取点赞记录
var likeList = [];
function checkLike(callback, args) {
  $.ajax({
    type: "post",
    url: checkLikeApi,
    dataType: "json",
    success: function(response) {
      console.log(response);
      if (response.statusCode === "200") {
        likeList = response.data;
        callback.apply(this, args);
      } else if (response.msg !== "没有记录") {
        swal({
          title: "获取点赞记录失败",
          text: response.msg + ",请检查网络。",
          type: "error",
          confirmButtonColor: "#af301b"
        });
      } else {
        callback.apply(this, args);
      }
    }
  });
}
