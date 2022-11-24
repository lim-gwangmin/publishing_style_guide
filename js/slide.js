
var slider = {
   mainVisualSetting: {
      dots: true,
      dotsClass: 'slideDot',
      fade: true,
      speed: 350,
      arrow: true,
      cssEase: 'ease-out',
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               arrows: false,
            }
         }
      ]
   },
   type01: {
      dots: true,
      infinite: false,
      dotsClass: 'slideDot',
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding:0,
      fade:false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               infinite: true,
               dots: true
            }
         },
      ]
   },
   funcMainVisual: function(targetName) {
      $(targetName).slick(this.mainVisualSetting);
   },
   funcType01: function(targetName) {
      $(targetName).slick(this.type01);
   }
};