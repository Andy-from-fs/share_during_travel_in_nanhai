// $(".region-bar .top").css("line-height", $(".region-bar").height() + "px");
// $(".region-bar .top .icon-user").css(
//   "line-height",
//   $(".region-bar").height() + "px"
// );
$(".footer").height(
  $(".footer .rule span").height() + $(".footer .rule img").height() + "px"
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
// var hammertime = new Hammer(document.querySelector(".rule"), {
//   recognizers: [
//     // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
//     [Hammer.Tap]
//   ]
// });
// hammertime.on("tap", function(ev) {
//   clickBtnRule();
// });
//排行榜
(function rankListPart() {
  var refresh = function() {
    $("#rankList .list .item").remove();
    if (!$.loading.isShow) {
      $.ajax({
        type: "post",
        url: getSortApi,
        dataType: "json",
        beforeSend: function(XHR) {
          $.loading.turn("加载中");
        },
        complete: function(XMLHttpRequest, textStatus) {
          $.loading.turn();
        },
        success: function(response) {
          console.log(response);
          if (response.statusCode === "200") {
            function setItem(selector, valueOfElement) {
              if (valueOfElement.avatar !== "") {
                $(selector + " .avatarImg").attr("src", valueOfElement.avatar);
              }
              $(selector + " .name").html(valueOfElement.username);
              $(selector + " .like-num").html(valueOfElement.star);
            }
            rankList.data = response.data;
            $.each(rankList.data, function(indexInArray, valueOfElement) {
              // if(valueOfElement.avatar&&valueOfElement.avatar===""){
              //   valueOfElement.avatar="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg";
              // }
              if (indexInArray === 0) {
                setItem("#rankList .first", valueOfElement);
              } else if (indexInArray === 1) {
                setItem("#rankList .second", valueOfElement);
              } else if (indexInArray === 2) {
                setItem("#rankList .third", valueOfElement);
              } else {
                if (indexInArray < 10) {
                  var html =
                    '<div class="item">\
                    <span class="num">' +
                    (parseInt(indexInArray) + 1) +
                    '</span>\
                    <div class="avatar-word">\
                      <div class="avatar">\
                        <img src="' +
                    valueOfElement.avatar +
                    '" class="avatarImg">\
                      </div>\
                      <div class="word">\
                        <div class="name">' +
                    valueOfElement.username +
                    '</div>\
                        <div class="like-wrapper">\
                          <span class="icon-heart"></span>\
                          <span class="like-num">' +
                    valueOfElement.star +
                    "</span>\
                          <span>赞</span>\
                        </div>\
                      </div>\
                    </div>\
                  </div>";
                  $(html).appendTo("#rankList .list");
                }
              }
            });
          }
        }
      });
    }
  };
  var rankList = {
    data: [],
    isShow: false,
    turn: function() {
      var element = createRankList();
      if (!rankList.isShow) {
        refresh();
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
        all.isEnd = true;
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
      '<div class="view btn" shareid="' +
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
             <div class="like btn" shareid="' +
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
    clickLike.call(this, "font", function() {
      $(this)
        .children(".like-num")
        .html(
          parseInt(
            $(this)
              .children(".like-num")
              .html()
          ) + 1
        );
    });
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

//注册页面
var createRegister = $.singleton(function() {
  var html =
    '<div id="register" class="fadeIn animated">\
      <div class="title"><span class="_left icon-back"></span>用户信息登记</span>\
      <div class="content-container">\
        <div class="input-wrapper">\
          <label for="name">姓名/昵称</label>\
          <input type="text" name="name">\
          <span class="hint">输入正确</span>\
        </div>\
        <div class="input-wrapper">\
          <label for="phone">手机号码</label>\
          <input type="text" name="phone">\
          <span class="hint">请输入有效的手机号码</span>\
        </div>\
        <div class="btn-register">提交</div>\
      </div>\
    </div>';
  var element = $(html).appendTo("body");
  $("#register .btn-register").on("click", function() {
    var data = {
      username: $('#register input[name="name"]').val(),
      mobile: $('#register input[name="phone"]').val()
    };
    if (!$.loading.isShow) {
      $.ajax({
        beforeSend: function(xhr) {
          $.loading.turn("提交中");
        },
        complete: function() {
          $.loading.turn();
        },
        type: "post",
        url: registerApi,
        data: data,
        dataType: "json",
        success: function(res) {
          console.log(res);
          if (res.statusCode === "200") {
            swal(
              {
                title: "登记成功",
                text: "你的名称:" + data.username + " 手机号码" + data.mobile,
                type: "success",
                confirmButtonColor: "#af301b"
              },
              function() {
                // console.log(register.href);
                window.location.href = register.href;
              }
            );
            register.off(data);
          }
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
    // console.log(data);
  });
  $("#register .icon-back").on("click", function() {
    register.off();
  });
  return element;
});
var register = {
  on: function() {
    console.log("on");
    var element = createRegister();
    $(element).css("display", "block");
  },
  off: function(data) {
    var element = createRegister();
    $(element).addClass("slideOutRight");
    setTimeout(function() {
      $(element).removeClass("slideOutRight");
      $(element).css("display", "none");
    }, 800);
  },
  href: ""
};

function checkIsRegister(noCallBack, yesCallback) {
  $.ajax({
    type: "post",
    url: getInfoApi,
    dataType: "json",
    success: function(response) {
      console.log(response);
      if (response.statusCode === "200") {
        console.log("已经注册");
        yesCallback.call(this);
      } else if (response.statusCode === "300") {
        console.log("未注册");
        noCallBack.call(this);
      }
    }
  });
}
checkIsRegister(
  function() {
    $("body").on("click", "#btn-my,#btn-share", function() {
      register.href = $(this).attr("href");
      register.on();
    });
  },
  function() {
    $("body").on("click", "#btn-my,#btn-share", function() {
      window.location.href = $(this).attr("href");
    });
  }
);

//筛选
(function() {
  var street = {
    name: "",
    psize: 10,
    page: 0,
    shareList: [],
    isEnd: false
  };
  var getShareInStreet = function(data, callBack) {
    $.ajax({
      type: "post",
      url: getShareApi,
      data: data,
      dataType: "json",
      success: function(response) {
        console.log(response);
        if (response.statusCode === "200") {
          //检查是否到底
          if (response.data.length < street.psize) {
            shareEnd("street");
            street.isEnd = true;
          }
          insertShare(response, "#street", street.shareList);
          if (typeof callBack === "function") {
            console.log(typeof callBack);
            callBack();
          }
        } else if (response.msg === "没有记录") {
          shareEnd("street");
          street.isEnd = true;
          if (typeof callBack === "function") {
            callBack();
          }
        }
      }
    });
  };
  var loadMoreInStreet = $.throttle(function() {
    var winScrollTop = $(window).scrollTop();
    var percent = winScrollTop / ($("body").outerHeight() - $(window).height());
    if (percent > 0.7 && !street.isEnd) {
      console.log("加载更多");
      getShareInStreet({
        psize: street.psize,
        page: ++street.page,
        street: street.name
      });
    }
  }, 300);
  $(".region-bar .region-item").on("click", function() {
    var type = $(this).html();
    $("#region").html(type);
    if (type === "全部") {
      $(window)
        .off("scroll")
        .scroll(loadMoreInAll);
      $("#street").fadeOut();
      $("#all")
        .delay(500)
        .fadeIn();
    } else {
      street.name = type;
      $("#street .col").empty();
      $(window)
        .off("scroll")
        .scroll(loadMoreInStreet);
      console.log(type);
      getShareInStreet(
        {
          psize: street.psize,
          page: street.page,
          street: street.name
        },
        function() {
          console.log("show");

          $("#all").fadeOut();
          $("#street")
            .delay(500)
            .fadeIn();
        }
      );
    }
    clickBtnRegions();
  });
  $("body").on("click", "#street .view", function() {
    // console.log("click");
    var enterArr,
      id = $(this).attr("shareid");
    $.each(street.shareList, function(indexInArray, valueOfElement) {
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
})();
