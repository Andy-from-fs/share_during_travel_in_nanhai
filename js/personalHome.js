function getColorCircle(index) {
  if (index === 0) {
    return 'green'
  } else if (index === 1) {
    return 'turquoiseBlue'
  } else if (index === 2) {
    return 'violet'
  } else if (index === 3) {
    return 'pink'
  } else if (index === 4) {
    return 'orange'
  }
}

// 设置画面
(function settingPart() {
  var setting = {
    isShow: false,
    turn: function () {
      var element = createSetting()
      if (!setting.isShow) {
        // show
        $('#setting .avatar img').attr('src', $('#avatar').attr('src'))
        $('#setting .btn-name').html($('#username').html())
        $('#setting .btn-phone').html(userInfo.mobile)
        $(element).css('display', 'block')
        setting.isShow = true
      } else {
        // hide
        $(element).addClass('slideOutRight')
        setTimeout(function () {
          $(element)
            .removeClass('slideOutRight')
            .css('display', 'none')
        }, 800)
        setting.isShow = false
      }
    }
  }
  var createSetting = $.singleton(function () {
    var html =
      '<div id="setting" class="slideInRight animated">\
      <div class="wrapper">\
        <div class="avatar item">\
          <span>头像</span>\
          <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test-avatar.jpg" width="15%">\
        </div>\
        <div class="nickName item">\
          <span>昵称</span>\
          <span class="btn-name">小明是一个常用的名字</span>\
        </div>\
        <div class="mobile item">\
          <span>手机号码</span>\
          <span class="btn-phone">12345678910</span>\
        </div>\
      </div>\
      <div class="btn-submit btn">确定</div>\
      <div class="btn-back btn">返回</div>\
    </div>'
    var element = $(html).appendTo('body')
    var updateBySwal = function () {
      var el = this
      var text = $(el)
        .children('span:first')
        .html()
      swal({
          title: '修改' + text,
          text: '输入新的' + text,
          type: 'input',
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonColor: "#af301b",
          animation: 'slide-from-top',
          inputPlaceholder: $(el)
            .children('span:last')
            .html()
        },
        function (inputValue) {
          if (inputValue === false) return false
          if (inputValue === '') {
            swal.showInputError('不能为空')
            return false
          }
          if (
            inputValue ===
            $(el)
            .children('span:last')
            .html()
          ) {
            swal.showInputError('请输入新的' + text)
            return false
          }
          if (text === '手机号码' && !checkPhoneReg.test(inputValue)) {
            swal.showInputError('请输入正确的手机号码')
          }
          $(el)
            .children('span:last')
            .html(inputValue)
          swal.close()
        }
      )
    }
    var submitToUpdata = function () {
      // 确定提交后台修改
      $.ajax({
        type: 'post',
        url: updateUserInfoApi,
        data: {
          username: $('#setting .btn-name').html(),
          mobile: $('#setting .btn-phone').html()
        },
        dataType: 'json',
        success: function (response) {
          console.log(response)
          if (response.statusCode === '200') {
            $('#username').html($('#setting .btn-name').html());
            swal({
              title: '修改成功',
              text: '2秒后自动关闭。',
              timer: 2000,
              type: 'success',
              showConfirmButton: false
            })
          }
        }
      })
      setting.turn()
    }
    $('body')
      .on('click', '#setting .btn-back', setting.turn)
      .on('click', '#setting .nickName', updateBySwal)
      .on('click', '#setting .mobile', updateBySwal)
      .on('click', '#setting .btn-submit', submitToUpdata)
    return element
  })

  $('body').on('click', '#btn-setting', setting.turn)
})()

// 获取用户信息
var userInfo,
  page = 0,
  psize = 100,
  isEnd = false
var setData = function (data) {
  $('.sum .photo .num').html(data.share_count ? data.share_count : '∞')
  $('.sum .like .num').html(data.star)
  $('#username').html(data.username)
  $('#avatar').attr(
    'src',
    data.avatar ? data.avatar : $('#avatar').attr('src')
  )
}
var getInfo = function () {
  $.ajax({
    type: 'post',
    url: getInfoApi,
    dataType: 'json',
    success: function (response) {
      console.log(response)
      if (response.statusCode === '200') {
        userInfo = response.data
        setData(userInfo)
      }
    }
  })
}

getInfo()

// 获取个人分享
var shareList;

function getShareList() {
  page++
  $.ajax({
    type: 'post',
    url: getMyselfShareApi,
    data: {
      psize: psize,
      page: page
    },
    dataType: 'json',
    success: function (response) {
      console.log(response)
      if (response.statusCode === '200') {
        shareList = response.data
        if (shareList.length < psize) {
          isEnd = true
        }
        $.each(shareList, function (indexInArray, valueOfElement) {
          var timeObj = splitTimeStr(valueOfElement.createtime)
          var imgUrlList = valueOfElement.image.split(',')
          var html =
            '<div class="item" shareid="' + valueOfElement.id + '" >\
          <div class="circle ' + getColorCircle(indexInArray % 5) + '"></div>\
          <div class="date">\
          <span>' + timeObj.month + '</span>\
          <span>/' + timeObj.day + '</span>'
          if (valueOfElement.status === '0') {
            html += '<div class="situlation noPass">未审核</div>'
          } else {
            html += '<div class="situlation">已审核</div>'
          }
          html += '</div><div class="images" shareid="' + valueOfElement.id + '">'
          $.each(imgUrlList, function (indexInArray, valueOfElement) {
            html += ' <img src="' + tomedia(imgUrlList[indexInArray]) + '">'
          })
          html +=
            '</div>\
          <div class="btn-group">\
          <span class="icon-heart" shareid="' +
            valueOfElement.id +
            '">点赞</span>\
          <span class="icon-trashcan" shareid="' +
            valueOfElement.id +
            '">删除</span>\
          </div>\
          </div>'
          $(html).appendTo('#share-content')
        })
        fixImagesHeight();
        //删除
        $('body').on('click', '#share-content .icon-trashcan', delHandler);
      } else {
        swal({
          title: '获取你的稿件失败',
          text: '请检查网络连接情况',
          type: 'error',
          confirmButtonColor: "#af301b"
        })
      }
    }
  })
}
getShareList();

//删除
function delHandler() {
  del($(this).attr('shareid'));
}

function del(id) {
  swal({
      title: "确认删除？",
      text: "删除该条稿件。",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#af301b"
    },
    function () {
      $.ajax({
        type: "get",
        url: delApi,
        data: {
          share_id: id
        },
        dataType: "json",
        success: function (response) {
          console.log(response);
          if (response.statusCode === "200") {
            swal({
              title: "成功删除",
              text: "2秒后自动关闭。",
              timer: 2000,
              showConfirmButton: true,
              confirmButtonColor: "#af301b",
              type: 'success'
            });
            $('#share-content .item[shareid="' + id + '"]').addClass('animated fadeOut');
            setTimeout(function(){
              $('#share-content .item[shareid="' + id + '"]').remove();
            },800);
          } else {
            swal({
              title: "删除失败",
              text: response.msg,
              showConfirmButton: true,
              type: 'error',
              confirmButtonColor: "#af301b"
            });
          }
        }
      });
    });
}
// 进入细览
$('body').on('click', '.images', function () {
  // console.log("click")
  // 输入id
  var enterArr, id = $(this).attr('shareid');
  $.each(shareList, function (indexInArray, valueOfElement) {
    if (valueOfElement.id == id) {
      enterArr = valueOfElement;
    }
  })
  $.detail.turn(enterArr);
});