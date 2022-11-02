$(function() {

    // main visual 
    $('.visualArea').slick({
        appendArrows: $('.slideBtnWrap'),
        /* dot */
        dots: true,
        dotsClass: 'visualDot',
        /* fade effect */
        fade: true,

        /* infinite */
        // infinite: true,

        /* slide speed */
        speed: 350,
        
        /* CSS3 Animation Easing */
        // cssEase: 'ease',
        // cssEase: 'ease-in',
        // cssEase: 'ease-in-out',
        cssEase: 'ease-out',

        // responsive
        responsive: [
            {
              breakpoint: 1360,
              settings: {
                arrows: false,
              }
            }
        ]
    });



});

$(function() {
   var win_wid = $(window).width();

   $('.btn_wrap > a').on('click', function(e) {
      $(this).addClass('active').siblings('a').removeClass('active');
      $(this.hash).addClass('active').siblings('div').removeClass('active');
      $(`.${this.hash.split('#')[1]}`).addClass('active').siblings().removeClass('active');

      e.stopPropagation();
      return false;
   });

});
