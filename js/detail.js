// 点赞方法
function clickLike(){
  
}

// 细览页
(function detailPart($) {
  var sum = 3
  var changeContent = function (data) {
    if (detail.id !== data.id) {
      detail.id = data.id;
      var imgWarp = $('#swiper .swipe-wrap').empty()
      window.swipe = null
      sum = 0
      $.each(data.image.split(','), function (indexInArray, valueOfElement) {
        var html = '<img src="' + tomedia(valueOfElement, '100p') + '" imgUrl="' + valueOfElement + '">'
        $(html).appendTo(imgWarp)
        sum++
      })
      setTimeout(function () {
        swipeInit()
      }, 800)
      // $('#detail .avatar').attr('src',tomedia())
      // $('#detail .name').html()
      $('#detail .location span:last').html(data.street + ' ' + data.address)
      $('#detail p.content').html(data.remark)
      $('#detail .like').attr('shareId', data.id)
    }
  }

  var swipeInit = function () {
    window.swipe = $('#swiper').Swipe({
        startSlide: 0,
        auto: 3000,
        draggable: false,
        autoRestart: false,
        continuous: true,
        disableScroll: true,
        stopPropagation: true,
        callback: function (index, element) {
          var dist = $(window).height() * 0.618 - $(element).height()
          $('#swiper .index').css({
            'margin-bottom': dist + 'px'
          })
          $('#detail .wrapper').css({
            'margin-top': -1 * dist + 'px',
            height: 'calc(38.2% + ' + dist + 'px)'
          })
        },
        transitionEnd: function (index, element) {
          // console.log(index)
          $('#swiper .index .num').html(index + 1 + '/' + sum)
        }
      })
      .data('Swipe')
    $('#swiper img').each(function (index, element) {
      if ($(element).height() > 0.618 * $(window).height()) {
        $(element).height(0.618 * $(window).height())
      }
    })
    // console.log(window.swipe.slide())

    var ele = '#swiper img[data-index="' + window.swipe.getPos() + '"]'
    var dist = $(window).height() * 0.618 - $(ele).height()
    $('#swiper .index').css({
      'margin-bottom': dist + 'px'
    })
    $('#detail .wrapper').css({
      'margin-top': -1 * dist + 'px',
      height: 'calc(38.2% + ' + dist + 'px)'
    })
  }

  var detail = {
    id: null,
    isShow: false,
    turn: function (data) {
      var element = createDetail()
      if (!detail.isShow) {
        // show
        changeContent(data)
        $(element).css('display', 'block')
        detail.isShow = true
      } else {
        // hide
        $(element).addClass('fadeOut')
        setTimeout(function () {
          $(element).removeClass('fadeOut')
          $(element).css('display', 'none')
        }, 800)
        detail.isShow = false
      }
    }
  }
  var createDetail = $.singleton(function () {
    var html =
      ' <div id="detail" class="animated">\
        <div class="content">\
        <div class="btn-back fadeIn animated">\
          <span class="icon-back"></span>\
        </div>\
        <div id="swiper" class="swipe slideInDown animated">\
          <div class="swipe-wrap">\
          </div>\
          <div class="index">\
            <span class="num">1/3</span>\
          </div>\
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
          <p class="like _right">\
            <span class="icon-heart"></span>\
            <span>赞·</span>\
            <span class="like-num">218</span>\
          </p>\
          <div class="clear"></div>\
        </div>\
        </div>\
    </div>'
    var element = $(html).appendTo('body');
    $('body').on('click', '#detail .btn-back', detail.turn);
    return element
  })
  $.detail = detail
})(jQuery)