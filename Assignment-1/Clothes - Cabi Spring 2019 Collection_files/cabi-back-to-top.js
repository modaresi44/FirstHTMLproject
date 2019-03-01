(function($) {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 132) {
        $('#cabi-back-to-top').removeClass("hide");
    } else {
        $('#cabi-back-to-top').addClass("hide");
    }
  });

  $(document).on("click", "#cabi-back-to-top", function(e) {
    e.preventDefault();
    $("html, body").animate({scrollTop: 0}, 1000);
  });

})(jQuery);