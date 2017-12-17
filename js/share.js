// window.onload = function () {
//   swal({
//     icon: "success",
//   });
// }
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
    console.log(evt);
    formList.imgUrlList = refreshList();
  }
});

// $("#picsList .btn-add").before(
//   '<li class="images">\
//           <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test4.jpg">\
//         </li>'
// );

var imgCount = 0,
  imgLimit = 3;
$("#fileupload").fileupload({
  url: uploadImgApi,
  autoUpload: true,
  dataType: "json",
  add: function(e, data) {
    $.loading.on("上传中");
    data.submit();
  },
  done: function(e, result) {
    console.log(result);
    function imgLoaded() {
      $.loading.off();
      $.toptip("成功上传图片");
    }
    var imgUrl = result.result.id;
    if (result.result.id != "id") {
      var btnAdd = $("#picsList .btn-add");
      var newImg =
        '<li class="images"  data-url="' +
        imgUrl +
        '">\
      <img src="' +
        tomedia(imgUrl, 60) +
        '">\
    </li>';
      imgCount++;
      // console.log(formList.imgUrlList);
      if (imgCount >= 3) {
        $(newImg)
          .replaceAll(btnAdd)
          .on("load", imgLoaded)
          .on("error", imgLoaded);
      } else {
        $(newImg)
          .insertBefore(btnAdd)
          .on("load", imgLoaded)
          .on("error", imgLoaded);
      }
      formList.imgUrlList = refreshList();
    } else {
      $.toptip("图片上传失败，请检查网络~", 2000, "warning");
    }
    $.loading.off();
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
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 16);
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
        console.log(r);
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          swal(
            "定位成功",
            "你的位置:" + r.address.province + " " + r.address.city,
            "success"
          );

          console.log("您的位置：" + r.point.lng + "," + r.point.lat);
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
      console.log(selectedVal);
      var selectedRegion = selectedVal[0];
      $("#region-name").html(selectedRegion);
    });

    $("body")
      .on("click", ".map-input .btn-selected", mapSelector.getData)
      .on("click", ".map-input .btn-selected", mapSelector.turn)
      .on("click", "section.map-input .region-select", function(){
        picker.show() 
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
    getData:function(){
      formList.region=$("#region-name").html();
      formList.view=$('input[name="view-name"]').val();
      console.log(formList);
      
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
        </div>\
        <div class="btn-selected">确定</div>\
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
