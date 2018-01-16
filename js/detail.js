// 点赞方法
function clickLike(text,callBack) {
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
          if(typeof callBack==="function")
            callBack.call(el);
        } else {
          swal({
            title: "点赞失败",
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
          '" data-img-url="' +
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
        check_img_has_loaded("#swiper img", swiper_init_or_updata);
      }, 800);
      // $('#detail .avatar').attr('src',tomedia())
      // $('#detail .name').html()
      $("#swiper .index .num").html(1 + "/" + sum);
      $("#detail .location span:last").html(data.street + " " + data.address);
      $("#detail p.content").html(data.remark);
      $("#detail .like").attr("shareid", data.id);
      $("#detail .name").html(data.username);
      $("#detail .avatar").attr("src", data.avatar);
      $("#detail .like-num").html(data.star);
    } else {
      $.bigLoading.turn();
    }
  };

  var check_img_has_loaded = function(imgSelector, callBack) {
    $.when
      .apply(
        null,
        $(imgSelector)
          .map(function(i, e) {
            var dfd = $.Deferred();
            if (e.complete) {
              console.log(`图片${i}加载完成`);
              dfd.resolve();
            } else {
              e.onload = function() {
                console.log(`图片${i}加载完成`);
                dfd.resolve();
              };
            }
            return dfd;
          })
          .toArray()
      )
      .done(callBack);
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
          tap: function(event) {
            gallery.turn($(event.path[0]).data("img-url"));
          },
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
      console.log("update");
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
        <div class="btn-back fadeIn animated btn">\
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
            <span class="name"></span>\
          </div>\
          <p class="location">\
            <span class="icon-location"></span>\
            <span></span>\
          </p>\
          <p class="content">\
          </p>\
          <p class="like _right btn" shareid="">\
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
    $("#detail").preventVerticalDraft();
    return element;
  });

  //点击大图
  var gallery = {
    isShow: false,
    url: "",
    turn: function(url) {
      var element = createGallery();
      gallery.url = url;
      if (!gallery.isShow) {
        //show
        $(element).css("display", "block");
        gallery.isShow = true;
        $(element)
          .children("img")
          .attr("src", tomedia(url, "100p", 100));
      } else {
        //hide
        $(element).addClass("fadeOut");
        setTimeout(function() {
          $(element)
            .removeClass("fadeOut")
            .css("display", "none");
        }, 400);
        gallery.isShow = false;
      }
    }
  };
  var createGallery = $.singleton(function() {
    var html =
      '<div class="gallery fadeIn animated" id="gallery">\
    <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test2.jpg" width="100%" height="100%" class="zoomIn animated">\
  </div>';
    var element = $(html).appendTo("body");
    function delImg() {
      // console.log(formList.imgUrlList.length);
      if (formList.imgUrlList.length === 3) {
        $("#picsList li.images[data-url='" + gallery.url + "']").remove();
        // console.log(btnAdd);
        btnAdd.fadeIn();
      } else {
        $("#picsList li.images").remove("[data-url='" + gallery.url + "']");
        formList.imgUrlList.splice(
          formList.imgUrlList.findIndex(function(val) {
            return val === gallery.url;
          }),
          1
        );
      }
      // console.log(formList);
    }
    $("body").on("click", "#gallery img", gallery.turn);
    // $("#gallery").preventVerticalDraft();
    return element;
  });

  $.detail = detail;
})(jQuery);
