//设置画面
(function settingPart() {
  var setting = {
    isShow: false,
    turn: function() {
      var element = createSetting();
      if (!setting.isShow) {
        //show
        $('#setting .avatar img').attr("src", $("#avatar").attr("src"));
        $('#setting .btn-name').html($("#username").html());
        $('#setting .btn-phone').html(userInfo.mobile);
        $(element).css("display", "block");
        setting.isShow = true;
      } else {
        //hide
        $(element).addClass("slideOutRight");
        setTimeout(function() {
          $(element)
            .removeClass("slideOutRight")
            .css("display", "none");
        }, 800);
        setting.isShow = false;
      }
    }
  };
  var createSetting = $.singleton(function() {
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
    </div>';
    var element = $(html).appendTo("body");
    var updateBySwal = function() {
      var el = this;
      var text = $(el)
        .children("span:first")
        .html();
      swal(
        {
          title: "修改" + text,
          text: "输入新的" + text,
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: $(el)
            .children("span:last")
            .html()
        },
        function(inputValue) {
          if (inputValue === false) return false;
          if (inputValue === "") {
            swal.showInputError("不能为空");
            return false;
          }
          if (
            inputValue ===
            $(el)
              .children("span:last")
              .html()
          ) {
            swal.showInputError("请输入新的" + text);
            return false;
          }
          if (text === "手机号码" && !checkPhoneReg.test(inputValue)) {
            swal.showInputError("请输入正确的手机号码");
          }
          $(el)
            .children("span:last")
            .html(inputValue);
          swal.close();
        }
      );
    };
    var submitToUpdata = function() {
      //确定提交后台修改
      $.ajax({
        type: "post",
        url: updateUserInfoApi,
        data: {
          username:$('#setting .btn-name').html(),
          mobile:$('#setting .btn-phone').html()
        },
        dataType: "json",
        success: function (response) {
          console.log(response);
          if(response.statusCode==="200"){
            swal({ 
              title: "修改成功", 
              text: "2秒后自动关闭。", 
              timer: 2000, 
              type:'success',
              showConfirmButton: false 
            });
          }
        }
      });
      setting.turn();
    };
    $("body")
      .on("click", "#setting .btn-back", setting.turn)
      .on("click", "#setting .nickName", updateBySwal)
      .on("click", "#setting .mobile", updateBySwal)
      .on("click", "#setting .btn-submit", submitToUpdata);
    return element;
  });

  $("body").on("click", "#btn-setting", setting.turn);
})();

//进入细览
$("body").on("click", ".images", function() {
  // console.log("click");
  //输入id
  $.detail.turn(0);
});


//获取用户信息
var userInfo;
var setData = function(data) {
  $(".sum .photo .num").html(data.photo ? data.photo : "∞");
  $(".sum .like .num").html(data.like);
  $("#username").html(data.username);
  $("#avatar").attr(
    "src",
    data.avatar ? data.avatar : $("#avatar").attr("src")
  );
};
var getInfo = function() {
  $.ajax({
    type: "post",
    url: getInfoApi,
    dataType: "json",
    success: function(response) {
      console.log(response);
      if (response.statusCode === "200") {
        userInfo = response.data;
        setData(userInfo);
      }
    }
  });
};

getInfo();


//获取个人分享

