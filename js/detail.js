// 点赞方法
function clickLike(text) {
  var id = $(this).attr("shareid");
  var el = $(this);
  if (!$.loading.isShow) {
    $.ajax({
      type: "post",
      url: likeApi,
      beforeSend: function(XHR) {
        $.loading.turn("点赞通信中");
      },
      complete: function(XMLHttpRequest, textStatus) {
        $.loading.turn();
      },
      data: {
        share_id: id
      },
      dataType: "json",
      success: function(response) {
        console.log(response);
        if (response.statusCode === "200") {
          if (typeof text === "string") {
            $(el).disHasLike(text);
          } else {
            $(el).disHasLike();
          }
        } else {
          swal({
            title: "点赞失败失败",
            text: response.msg,
            type: "error",
            confirmButtonColor: "#af301b"
          });
        }
      }
    });
  }
}

// 细览页
(function detailPart($) {
  var imgIsSame = false,
    sum = 1,
    mySwiper,
    margin_top_dist = [],
    wrapper_min_height = 0;
  var changeContent = function(data) {
    console.log(data);
    if (detail.id !== data.id) {
      detail.id = data.id;
      var imgWarp = $("#swiper .swiper-wrapper").empty();
      window.swipe = null;
      sum = 0;
      $.each(data.image.split(","), function(indexInArray, valueOfElement) {
        var html =
          '<img src="' +
          tomedia(valueOfElement, "70p", 50) +
          '" imgUrl="' +
          valueOfElement +
          '" class="swiper-slide">';
        $(html).appendTo(imgWarp);
        sum++;
      });
      $.each(likeList, function(indexInArray, valueOfElement) {
        if (valueOfElement === data.id) {
          $("#detail .like").disHasLike("font");
          // break;
        }
      });
      setTimeout(function() {
        checkImgHasLoad("#swiper img", swiper_init_or_updata);
      }, 800);
      // $('#detail .avatar').attr('src',tomedia())
      // $('#detail .name').html()
      $("#swiper .index .num").html(1 + "/" + sum);
      $("#detail .location span:last").html(data.street + " " + data.address);
      $("#detail p.content").html(data.remark);
      $("#detail .like").attr("shareid", data.id);
      $("#detail .name").html(data.username);
      $("#detail .avatar").attr("src", data.avatar);
    } else {
      $.bigLoading.turn();
    }
  };

  var checkImgHasLoad = function(imgSelector, callBack) {
    $.when.apply(null, $(imgSelector).map(function(i, e) {
      var dfd = $.Deferred();
      if (e.complete) {
        console.log(`图片${i}加载完成`);
        dfd.resolve()
      }else{
        e.onload = function() {
        console.log(`图片${i}加载完成`);
        dfd.resolve()
        }
      }
      return dfd;
    }).toArray()).done(callBack);
  };

  var fixImgtoSame = function() {
    var imgH = [],
      winH = $(window).height(),
      contentH = $("#detail .wrapper").height();
    $("#swiper img").each(function(index, element) {
      imgH.push($(this).height());
    });
    var maxH = imgH.max();
    if (maxH > winH * 0.5) {
      $("#swiper img").each(function(index, element) {
        $(this).height(winH * 0.5);
        $("#detail .wrapper").css({
          "min-height": winH * 0.5 + "px"
        });
      });
    } else {
      $("#swiper img").each(function(index, element) {
        $(this).height(maxH);
      });
      var dist = winH - maxH - contentH;
      if (dist > 0) {
        $("#detail .wrapper").height(contentH + $("#detail .wrapper").height());
      }
    }
  };

  function margin_wrapper_to_right_position() {
    var move_top_dist = margin_top_dist[mySwiper.realIndex];
    $("#detail .wrapper").css({
      "min-height": wrapper_min_height + move_top_dist + "px",
      "margin-top": -1 * move_top_dist + "px"
    });
    $(".swiper-pagination").css({
      bottom: 10 + move_top_dist + "px"
    });
  }

  function unify_img_size() {
    // console.log("inited");
    var imgH = [],
      winH = $(window).height(),
      contentH = $("#detail .wrapper").height();
    $("#swiper img").each(function(index, element) {
      imgH.push($(this).height());
    });
    var maxH = imgH.max();
    if (maxH > winH * 0.618) {
      maxH = winH * 0.618;
    }
    $("#swiper img").each(function(index, element) {
      var dist = maxH - $(element).height();
      console.log($(element).height());
      if (dist > 0) {
        margin_top_dist.push(dist);
      } else {
        margin_top_dist.push(0);
      }
      $(element).height(maxH);
    });
    wrapper_min_height = winH - maxH;
    $("#detail .wrapper").css("min-height", wrapper_min_height + "px");
  }

  var swiper_init_or_updata = function() {
    // old swiper------------------------------
    margin_top_dist = [];
    if (!mySwiper) {
      mySwiper = new Swiper(".swiper-container", {
        loop: false,
        observer: true,
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          init: function() {
            console.log("inited");
            unify_img_size();
            setTimeout(function() {
              $.bigLoading.turn();
            }, 500);
          },
          slideChange: function() {
            margin_wrapper_to_right_position();
          }
        }
      });
    } else {
      console.log('update');
      mySwiper.update();
      mySwiper.slideTo(0);
      unify_img_size();
      setTimeout(function() {
        $.bigLoading.turn();
      }, 500);
    }
  };

  var detail = {
    id: null,
    isShow: false,
    turn: function(data) {
      var element = createDetail();
      if (!detail.isShow) {
        $.bigLoading.turn();
        // show
        setTimeout(function() {
          changeContent(data);
          $(element).css("display", "block");
          detail.isShow = true;
          setTimeout(function() {
            margin_wrapper_to_right_position();
          }, 800);
        }, 800);
      } else {
        // hide
        $(element).addClass("fadeOut");
        setTimeout(function() {
          $(element).removeClass("fadeOut");
          $(element).css("display", "none");
        }, 800);
        detail.isShow = false;
      }
    }
  };
  var createDetail = $.singleton(function() {
    var html =
      ' <div id="detail" class="animated">\
        <div class="content">\
        <div class="btn-back fadeIn animated">\
          <span class="icon-back"></span>\
        </div>\
        <div id="swiper" class="swiper-container slideInDown animated">\
          <div class="swiper-wrapper">\
          </div>\
          <div class="swiper-pagination"></div>\
        </div>\
        <div class="wrapper slideInUp animated">\
          <div class="avatar-name">\
            <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" class="avatar">\
            <span class="name">小明是一个常用的名字</span>\
          </div>\
          <p class="location">\
            <span class="icon-location"></span>\
            <span></span>\
          </p>\
          <p class="content">\
            本次新装的岗亭外观为了契合千灯湖的整体气质，使用了与千灯湖周边建筑相同的朱红色，让小巧的岗亭与千灯湖和谐地融合在一起。同时，为了使岗亭更加实用，在原来的结构基础上，把玻璃窗的位置换成开合式的铁盖。\
          </p>\
          <p class="like _right" shareid="">\
            <span class="icon-heart"></span>\
            <span>赞·</span>\
            <span class="like-num">218</span>\
          </p>\
          <div class="clear"></div>\
        </div>\
        </div>\
    </div>';
    var element = $(html).appendTo("body");
    $("body").on("click", "#detail .btn-back", detail.turn);
    $("#detail .like").on("click", clickLike);
    return element;
  });

  $.detail = detail;
})(jQuery);
