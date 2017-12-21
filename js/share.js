// window.onload = function () {
//   swal({
//     icon: "success",
//   });
// }
// $.loading.turn();
$(".img-list").height(($(window).width() - 30) * 0.3);
$(".img-list .word").css("line-height", ($(window).width() - 30) * 0.3 + "px");

function refreshList() {
  var list = [];
  $("#picsList .images").each(function(index, element) {
    list.push($(element).attr("data-url"));
  });
  return list;
}

var sortable = new Sortable(document.getElementById("picsList"), {
  // dragClass: "sortable-item",
  // filter: ".ignore-elements",
  // draggable: ".images",
  animation: 150,
  // Element dragging ended
  onEnd: function(/**Event*/ evt) {
    // console.log(evt);
    formList.imgUrlList = refreshList();
  }
});

// $("#picsList .btn-add").before(
//   '<li class="images">\
//           <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test4.jpg">\
//         </li>'
// );

//图片上传
var imgLimit = 3,
  btnAdd = $("#picsList .btn-add");
$("#fileupload").fileupload({
  url: uploadImgApi,
  autoUpload: true,
  dataType: "json",
  add: function(e, data) {
    $.loading.on("上传中");
    data.submit();
  },
  done: function(e, result) {
    // console.log(result);
    function imgLoaded() {
      // console.log("loading finish");
      $.loading.off();
      $.toptip("成功上传图片");
    }
    var imgUrl = result.result.id;
    if (result.result.id != "id") {
      var newImg =
        '<li class="images"  data-url="' +
        imgUrl +
        '">\
      <img src="' +
        tomedia(imgUrl, "300x", 60) +
        '">\
    </li>';
      // console.log(formList.imgUrlList.length);
      if (formList.imgUrlList.length >= 2) {
        $(btnAdd).fadeOut();
        setTimeout(function() {
          $(newImg)
            .insertAfter(btnAdd)
            .on("click", gallery.turn)
            .children("img")
            .on("load", imgLoaded)
            .on("error", imgLoaded);
          formList.imgUrlList = refreshList();
        }, 500);
      } else {
        $(newImg)
          .insertBefore(btnAdd)
          .on("click", gallery.turn)
          .children("img")
          .on("load", imgLoaded)
          .on("error", imgLoaded);
        formList.imgUrlList = refreshList();
      }
    } else {
      $.toptip("图片上传失败，请检查网络~", 2000, "warning");
    }
    // $.loading.off();
  }
});

// (function() {})();

var formList = {
  content: "",
  imgUrlList: [],
  region: "",
  view: ""
};
//地图--选择地点
(function() {
  function initMapSelector() {
    var map = new BMap.Map("map");
    var point = new BMap.Point(113.149756, 23.035399);
    map.centerAndZoom(point, 16);

    //覆盖物添加
    var markers = [];
    $.each(views, function(indexInArray, valueOfElement) {
      var lng = valueOfElement.lngLat.split(",")[0];
      var lat = valueOfElement.lngLat.split(",")[1];
      markers[indexInArray] = new BMap.Marker(new BMap.Point(lng, lat));
      markers[indexInArray].addEventListener(
        "click",
        function(e) {
          // console.log(e);
          map.centerAndZoom(e.currentTarget.point, 17);
          mapSelector
            .insertData(valueOfElement.region, valueOfElement.view)
            .setDataToView()
            .turn();
        },
        false
      );
      map.addOverlay(markers[indexInArray]); //增加点
    });

    //浏览器定位
    var navigation = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      // offset:new BMap.Size(0,0),
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      showZoomInfo: false,
      enableGeolocation: true
    });
    map.addControl(navigation);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        // console.log(r);
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          // swal(
          //   "定位成功",
          //   "你的位置:" + r.address.province + " " + r.address.city,
          //   "success"
          // );

          // console.log("您的位置：" + r.point.lng + "," + r.point.lat);
        } else {
          swal("定位失败", "请检查你的网路与允许网页获取你的位置信息", "error");
          console.log("failed" + this.getStatus());
          //关于状态码
          //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
          //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
          //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
          //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
          //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
          //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
          //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
          //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
          //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
        }
      },
      { enableHighAccuracy: true }
    );

    map.addEventListener(
      "touchstart",
      function() {
        if ($(".map-input .view-input").is(":focus")) {
          $(".map-input .view-input").trigger("blur");
        }
      },
      false
    );

    //选择镇街框
    var region = [
      {
        text: "桂城",
        value: "桂城"
      },
      {
        text: "西樵",
        value: "西樵"
      },
      {
        text: "九江",
        value: "九江"
      },
      {
        text: "丹灶",
        value: "丹灶"
      },
      {
        text: "狮山",
        value: "狮山"
      },
      {
        text: "大沥",
        value: "大沥"
      },
      {
        text: "里水",
        value: "里水"
      }
    ];

    var picker = new Picker({
      data: [region],
      title: "选择镇街"
    });

    picker.on("picker.select", function(selectedVal, selectedIndex) {
      // nameEl.innerText = data1[selectedIndex[0]].text + ' ' + data2[selectedIndex[1]].text + ' ' + data3[selectedIndex[2]].text;
      // console.log(selectedVal);
      var selectedRegion = selectedVal[0];
      $("#region-name").html(selectedRegion);
    });

    $("body")
      .on("click", ".map-input .btn-selected", mapSelector.getData)
      .on("click", ".map-input .btn-selected", mapSelector.setDataToView)
      .on("click", ".map-input .btn-selected", mapSelector.turn)
      .on("click", "section.map-input .region-select", function() {
        picker.show();
      });
  }

  var mapSelector = {
    isShow: false,
    turn: function() {
      var element = createMapSelector();
      if (!mapSelector.isShow) {
        //show
        $(element).css("display", "block");
        mapSelector.isShow = true;
      } else {
        //hide
        $(element).addClass("slideOutLeft");
        setTimeout(function() {
          $(element)
            .removeClass("slideOutLeft")
            .css("display", "none");
        }, 800);
        mapSelector.isShow = false;
      }
    },
    insertData: function(region, view) {
      formList.region = region;
      formList.view = view;
      return mapSelector;
    },
    getData: function() {
      mapSelector.insertData(
        $("#region-name").html(),
        $('input[name="view-name"]').val()
      );
      // console.log(formList);
    },
    setDataToView: function() {
      $('.location-wrapper span:not(".icon-location")')
        .html(formList.region + " " + formList.view)
        .css("color", "rgb(40,40,40)");
      return mapSelector;
    }
  };

  var createMapSelector = $.singleton(function() {
    var html =
        '<section class="map-input slideInLeft animated">\
        <div id="map"></div>\
        <div class="btn-group">\
          <div class="region-select">\
            <p>\
              <span id="region-name">选择镇街</span>\
              <span class="icon-triangle-down"></span>\
            </p>\
          </div>\
          <input class="view-input" type="text" name="view-name">\
          <div class="btn-selected"><span class="icon-plus"></span> </div>\
        </div>\
        <div class="btn-back">\
          <span class="icon-back"></span>\
        </div>\
      </section>',
      element = $(html).appendTo("body");
    $("body").on("click", ".map-input .btn-back", mapSelector.turn);
    initMapSelector();
    return element;
  });

  $("body").on("click", ".btn-location", mapSelector.turn);
})();

//点击大图
var gallery = {
  isShow: false,
  url: "",
  turn: function() {
    var element = createGallery(),
      url = $(this).attr("data-url");
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
    <div class="btn-del">\
      <span class="icon-trashcan"></span>\
    </div>\
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
  $("body")
    .on("click", "#gallery .btn-del", delImg)
    .on("click", "#gallery .btn-del", gallery.turn)
    .on("click", "#gallery img", gallery.turn);
  return element;
});

// console.log(views);
// $.toptip("成功上传图片");

// //注册页面
// var createRegister = $.singleton(function() {
//   var html =
//     '<div id="register" class="slideInLeft animated">\
//       <div class="title">用户信息登记</div>\
//       <div class="content-container">\
//         <div class="input-wrapper">\
//           <label for="name">姓名/昵称</label>\
//           <input type="text" name="name">\
//           <span class="hint">输入正确</span>\
//         </div>\
//         <div class="input-wrapper">\
//           <label for="phone">手机号码</label>\
//           <input type="text" name="phone">\
//           <span class="hint">请输入有效的手机号码</span>\
//         </div>\
//         <div class="btn-register">提交</div>\
//       </div>\
//     </div>';
//   var element = $(html).appendTo("body");
//   $("#register .btn-register").on("click", function() {
//     var data = {
//       username: $('#register input[name="name"]').val(),
//       mobile: $('#register input[name="phone"]').val()
//     };
//     $.ajax({
//       type: "post",
//       url: registerApi,
//       data: {
//         username: "haha",
//         mobile: "13250885448"
//       },
//       dataType: "json",
//       success: function(res) {
//         console.log(res);
//         if (res.statusCode === "200") {
//           swal(
//             "登记成功",
//             "你的名称:" + data.username + " 手机号码" + data.mobile,
//             "success"
//           );
//           register.off(data);
//         }
//       },
//       error: function(error) {
//         console.log(error);
//       }
//     });
//     // console.log(data);
//   });
//   return element;
// });
// var register = {
//   on: function() {
//     console.log("on");
//     var element = createRegister();
//     $(element).css("display", "block");
//   },
//   off: function(data) {
//     var element = createRegister();
//     $(element).addClass("slideOutRight");
//     setTimeout(function() {
//       $(element).detach();
//     }, 800);
//     register = null;
//     console.log("off");
//   }
// };

// function checkIsRegister(noCallBack) {
//   $.ajax({
//     type: "post",
//     url: getInfoApi,
//     dataType: "json",
//     success: function(response) {
//       console.log(response);
//       if (response.statusCode === "200") {
//         console.log("已经注册");
//       } else if (response.statusCode === "300") {
//         console.log("未注册");
//         noCallBack.call(this);
//       }
//     }
//   });
// }
// checkIsRegister(register.on);
// register.on();

function submit() {
  formList.content = $('textarea[name="words"]').val();
  console.log(formList);
  console.log(formList.imgUrlList.join(","));
  if (!$.loading.isShow) {
    $.ajax({
      type: "post",
      url: addShareApi,
      beforeSend: function(XHR) {
        $.loading.turn("正在努力投稿中", true);
      },
      complete: function(XMLHttpRequest, textStatus) {
        $.loading.turn();
      },
      data: {
        remark: formList.content,
        image: formList.imgUrlList.join(","),
        address: formList.view,
        street: formList.region
      },
      dataType: "json",
      success: function(response) {
        console.log(response);
        if (response.msg === "添加成功") {
          swal(
            {
              title: "分享成功",
              text: "2秒后自动跳转至个人主页。",
              timer: 2000,
              showCancelButton: true,
              confirmButtonColor: "#af301b",
              cancelButtonText: "留在本页",
              type: "success"
            },
            function() {
              window.location.href = userHerf;
            }
          );
        } else {
          swal({
            title: "添加失败",
            text: response.msg,
            timer: 2000,
            showConfirmButton: false,
            type: "error"
          });
        }
      }
    });
  }
}
$("body").on("click", ".btn-submit", submit);
