var limit = 315;
var offsets = {
  "head": 80,
  "fog": 210
};

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(fn) { fn() }
};

var parallax = function(offset) {
  for(var layer in offsets) {
    var top = Math.round(offsets[layer]*(offset/limit));
    frame(layer, offset, top)
  }
};

var frame = function(layer, offset, top) {
  requestAnimationFrame(function() {
    $(".bg-"+layer).css("top", (offset-top)+"px");
  });
};

$(window).on("scroll", function() {
  var offset = window.scrollY;
  if(offset <= limit) {
    parallax(offset);
  }
});

parallax(Math.min(window.scrollY, limit));
