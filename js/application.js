/*
 * Android
 */

if(navigator.userAgent.indexOf("Android") >= 0) {
  $("[data-play-store]").attr("href", "market://details?id=com.playmous.gemcrafter")
}

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
  var isTouchDevice = "ontouchstart" in document.documentElement;
  var totalWidth = $(".gallery ul").width();
  var screenWidth = $(".gallery .screen").width();
  $(".gallery ul").data("currentLeft", 0);

  var moveSlide = function(nextLeft) {
    $(".gallery ul").css("left", nextLeft+"px");
    $(".gallery ul").data("currentLeft", nextLeft);

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
    var currentLeft = $(".gallery ul").data("currentLeft");
    var nextLeft = currentLeft + screenWidth;
    if(currentLeft % screenWidth == 0) {
      if(nextLeft <= 0) {
        moveSlide(nextLeft);
      }
    }
    return false;
  });

  $(".gallery .right").on("click", function() {
    var currentLeft = $(".gallery ul").data("currentLeft");
    var nextLeft = currentLeft - screenWidth;
    if(currentLeft % screenWidth == 0) {
      if(nextLeft > -totalWidth) {
        moveSlide(nextLeft);
      }
    }
    return false;
  });

  /* Mobile */
  $(".gallery").swipe({
    tap: function() {
      if (!isTouchDevice) return false;
      $(".gallery").toggleClass("fullscreen").toggleClass("inline");
    },
    swipeRight: function() {
      $(".gallery .left").trigger("click");
    },
    swipeLeft: function() {
      $(".gallery .right").trigger("click");
    }
  });
})
