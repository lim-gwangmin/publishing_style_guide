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
   centerMode: {
      dots: false,
      infinite: true,
      dotsClass: 'slideDot',
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '6rem',
      fade:false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               infinite: true,
               centerPadding: '4rem',
            }
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 1,
               centerMode: false,
               infinite: false,
               centerPadding: '0',
            }
         },
      ]
   },
   navMode: function(sliderFor, sliderNav) {
      $(sliderFor).slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         fade: true,
         asNavFor: sliderNav,
      });
      $(sliderNav).slick({
         slidesToShow: 3,
         slidesToScroll: 1,
         asNavFor: sliderFor,
         dots: false,
         centerMode: true,
         focusOnSelect: true,
         infinite: false,
         responsive: [
            {
               breakpoint: 767,
               settings: {
                  slidesToShow: 2,
                  centerMode: false,
               }
            },
         ]
      });
   },
   funcMainVisual: function(targetName) {
      $(targetName).slick(this.mainVisualSetting);
   },
   funcType01: function(targetName) {
      console.log(window)
      $(targetName).slick(this.type01);
   },
   funcCenterMode: function(targetName) {
      $(targetName).slick(this.centerMode);
   },
   funcNavSlider: function(sliderFor, sliderNav) {
      return this.navMode(sliderFor, sliderNav);
   }
};

console.log()