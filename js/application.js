/*
 * Parallax
 */

var limit = 315;
var offsets = {
  "head": 80,
  "fog": 210
};

var parallax = function(offset) {
  for(var layer in offsets) {
    var top = offset-Math.round(offsets[layer]*(offset/limit));
    $(".bg-"+layer).css("transform", "translate3d(0,"+top+"px,0)");
  }
};

$(window).on("scroll", function() {
  var offset = window.scrollY;
  if(offset <= limit) {
    parallax(offset);
  }
});

parallax(Math.min(window.scrollY, limit));

/*
 * Gallery
 */

$(function() {
  var totalWidth = $(".gallery ul").width();
  var screenWidth = $(".gallery .screen").width();

  var moveSlide = function(nextLeft) {
    $(".gallery ul").css("left", nextLeft+"px");

    if(nextLeft == 0) {
      $(".gallery .left").removeClass("active");
    }else{
      $(".gallery .left").addClass("active");
    }

    if(nextLeft == -(totalWidth - screenWidth)) {
      $(".gallery .right").removeClass("active");
    }else{
      $(".gallery .right").addClass("active");
    }
  }

  $(".gallery .left").on("click", function() {
    var currentLeft = parseInt($(".gallery ul").css("left"));
    var nextLeft = currentLeft + screenWidth;
    if(currentLeft % screenWidth == 0) {
      if(nextLeft <= 0) {
        moveSlide(nextLeft);
      }
    }
    return false;
  });

  $(".gallery .right").on("click", function() {
    var currentLeft = parseInt($(".gallery ul").css("left"));
    var nextLeft = currentLeft - screenWidth;
    if(currentLeft % screenWidth == 0) {
      if(nextLeft > -totalWidth) {
        moveSlide(nextLeft);
      }
    }
    return false;
  });
})
