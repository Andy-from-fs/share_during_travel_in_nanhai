// window.onload = function () {
//   swal({
//     icon: "success",
//   });
// }
$(".img-list").height(($(window).width() - 30) * 0.3);
$(".img-list .word").css("line-height", ($(window).width() - 30) * 0.3 + "px");

var sortable = new Sortable(document.getElementById("picsList"), {
  // dragClass: "sortable-item",
  // filter: ".ignore-elements",
  // draggable: ".images",
  animation: 150,
  // Element dragging ended
  onEnd: function(/**Event*/ evt) {
    // var itemEl = evt.item; // dragged HTMLElement
    console.log(evt);
  }
});

$("#picsList .btn-add").before(
  '<li class="images">\
          <img src="../addons/citygf/template/mobile/nhly/nanhai-yinji/img/test4.jpg">\
        </li>'
);
