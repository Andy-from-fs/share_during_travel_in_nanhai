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
    imgUrlList = refreshList();
  }
});

// $("#picsList .btn-add").before(
//   '<li class="images">\
//           <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test4.jpg">\
//         </li>'
// );

var imgCount = 0,
  imgUrlList = [],
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
      // console.log(imgUrlList);
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
      imgUrlList = refreshList();
    } else {
      $.toptip("图片上传失败，请检查网络~", 2000, "warning");
    }
    $.loading.off();
  }
});
