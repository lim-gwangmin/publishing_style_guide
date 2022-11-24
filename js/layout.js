$(function() {
   var ACTIVE= 'active';
   var OVERFLOW= 'overflow';
   var SITEMAP= 'siteMap';
   var DATA_MODAL = 'data-modal';
   var MODAL_BG = 'modal_bg';   
   var ON = 'on';

   var $window= $(window);
   var $html= $('html');
   var $body= $('body');
   var $wrap= $('#wrap');
   var $quickNav= $('#quickNav');
   var $header= $('#header');
   var $scrollDirection = $('.scrolldirection');
   var $depth1= $('.depth1');
   var $depthMenu= $('.depthMenu');
   var $siteMapBtn= $(".siteMap-btn");
   var $menusWrap= $('.menusWrap');
   var $relateSite = $('.relateSite');
   var $relateSite_title= $('.relateSite_title');
   var $depth1_title = $('.depth1_title');
   var $searchBtn = $('.searchBtn');
   var $totalSearch_wrapper = $('.totalSearch_wrapper');
   var $SideMenu_depth1 = $('.SideMenu_depth1 > a');
   var $SideMenu_depth2 = $('.SideMenu_depth2 > li > a');
   var $modal_bg = $('.' + MODAL_BG);
   var $modal_open = $('.modal_open');
   var $modal_close = $('.modal_close');


   $html.on('click', function(e) {
      var $target= $(e.target);
      var winWid= $window.width(); 

      if(($target.attr('id') === 'wrap') && ($target.hasClass(ACTIVE))) {
         // site-map
         siteMapRemove();
         mobileDepthToggle();
      };
      // site map remove 
      if($target.hasClass('relateSite')) {
         familySiteRemove();
      }
      // total search popup
      if($target.hasClass('totalSearch_wrapper') || $target.hasClass('totalSearch_close')) { 
         totalSearchClose();
      }

      if($target.hasClass(MODAL_BG)) {
         $target.removeClass(ACTIVE);

         if($modal_bg.hasClass(ACTIVE)) {
            return;
         }
   
         $body.removeClass(OVERFLOW);
      }
      // pad , mobile 
      if (winWid <= 1024) {
         // sub side menu close
         sideMenuClose();
      }

   });
/* ===========================================================================================
   scroll up,down 
   scroll btn opacity toggle
=========================================================================================== */
   var lastScrollY = 0;
   var SCROLL_DONW = 'scrollDown';
   var SCROLL_UP = 'scrollUp';
   var SCROLL_TOP = 50;
   var DEBOUNCE_DELAY = 200;

   $window.on('scroll', debounce( function(){
      var scrollY = window.scrollY;
      var direction = scrollY > lastScrollY ? SCROLL_DONW : SCROLL_UP;

      if(direction === SCROLL_DONW) {
         $header.addClass(SCROLL_DONW);
      } else {
         $header.removeClass(SCROLL_DONW);
      }

      topNavBtn();

      lastScrollY = scrollY;

      }, DEBOUNCE_DELAY));


      function topNavBtn() {
         var $window = $(this);
         var scTop= $window.scrollTop();
   
         if(scTop > SCROLL_TOP) {
            $quickNav.addClass(ACTIVE);
         } else {
            $quickNav.removeClass(ACTIVE);
         };
      };
/* ===========================================================================================
  quick nav click
=========================================================================================== */
   $quickNav.on('click', function() {

      $('html, body').animate({
            scrollTop: 0,
      }, 500);
   });

/* ===========================================================================================
   header evnet
=========================================================================================== */
   //  desktop header
   function deskDepthOpen() {
      var winWid = $window.width();
      var targetHasClass = $menusWrap.hasClass(SITEMAP);
      if (winWid < 1024) return;
      if(targetHasClass) return;

      $header.addClass(ACTIVE);
      $depthMenu.addClass(ACTIVE);
   }; 
   function deskDepthClose() {
      var winWid = $window.width();
      var targetHasClass = $menusWrap.hasClass(SITEMAP);

      if (winWid < 1024) return;
      if(targetHasClass) return;

      $body.removeClass(OVERFLOW);
      $header.removeClass(ACTIVE);
      $depthMenu.removeClass(ACTIVE);
   }; 
   $depth1.on({
      // menu open
      mouseenter: deskDepthOpen,
      focusin: deskDepthOpen,
      // menu close
      mouseleave: deskDepthClose,
      focusout: deskDepthClose,
   });

   // mobile header
   function mobileDepthToggle() {
      var winWid = $window.width();
      if (winWid > 1024) return;

      $(this)
      .parent('.depth1')
      .toggleClass(ACTIVE)
      .siblings()
      .removeClass(ACTIVE);

      return false;
   };
   $depth1_title.bind('click', mobileDepthToggle);

   //site-map
   function siteMapToggle() {
      if($body.hasClass(OVERFLOW)) {
            $body.removeClass(OVERFLOW);
      } else {
            $body.addClass(OVERFLOW);
      }
      $menusWrap.toggleClass(SITEMAP);
      $siteMapBtn.toggleClass(ACTIVE);
      $wrap.toggleClass(ACTIVE);
   };
   function siteMapRemove() {
      $body.removeClass(OVERFLOW);
      $wrap.removeClass(ACTIVE);
      $menusWrap.removeClass(SITEMAP);
      $siteMapBtn.removeClass(ACTIVE);
   };
   $siteMapBtn.on('click', siteMapToggle);
/* ===========================================================================================
  total search popup
=========================================================================================== */
   function totalSearchOpen() {
      $body.addClass(OVERFLOW);
      $totalSearch_wrapper.addClass(ACTIVE);    
   };
   function totalSearchClose() {
      $totalSearch_wrapper.removeClass(ACTIVE);

      if(!$menusWrap.hasClass(SITEMAP)) {
         $body.removeClass(OVERFLOW);
      }

      return;
   };
   $searchBtn.on('click', totalSearchOpen);
/* ===========================================================================================
   sub layout
=========================================================================================== */
   // side menu 
   function sideMenuClose() {
      $('#subSideMenu').removeClass('overView');
         //depth1 close
         $SideMenu_depth1
         .parent('.SideMenu_depth1')
         .removeClass(ON)
         .siblings()
         .removeClass(ON);
         
         //depth2 close
         $SideMenu_depth2
         .parent('li')
         .removeClass(ON)
         .siblings()
         .removeClass(ON);
   };
   $SideMenu_depth1.on('click', function() {
      var winWid = $window.width();
      var $this= $(this);
      var depth2Has = $(this).siblings().hasClass('SideMenu_depth2');
      var $thisParent = $this.parent('.SideMenu_depth1');
      
      if(!depth2Has) return

      // desk top
      if (winWid > 1024 && $thisParent.hasClass(ACTIVE)) {
            // preventDefault
            return false;
      } 
      
      // pad, mobile
      if($thisParent.hasClass(ACTIVE)) {
            $('#subSideMenu').toggleClass('overView');

            $thisParent
            .toggleClass(ON)
            .siblings()
            .toggleClass(ON);

            // preventDefault
            return false;
      }

   });
   $SideMenu_depth2.on('click', function() {
      var windWid = $window.width();
      var $this = $(this);
      var $thisParent = $this.parent('li');

      // desk top
      if(windWid > 1024) return;

      if($thisParent.hasClass(ACTIVE)) {
            $thisParent
            .toggleClass(ON)
            .siblings()
            .toggleClass(ON);

            // preventDefault
            return false;
      }

   });
/* ===========================================================================================
   footer family site
=========================================================================================== */
   function familySiteToggle() {
      $relateSite.toggleClass(ACTIVE);
      $relateSite_title.toggleClass(ACTIVE);

      $relateSite_title
      .siblings('.relateSite_list')
      .stop(true, true)
      .slideToggle();
   };
   function familySiteRemove() {
      $relateSite.removeClass(ACTIVE);
      $relateSite_title.removeClass(ACTIVE);

      $relateSite_title
      .siblings('.relateSite_list')
      .stop(true, true)
      .slideUp();
   };
   $relateSite.on('click', familySiteToggle);
/* ===========================================================================================
   modal
=========================================================================================== */
   //  modal open
   $modal_open.on('click', function() {
      var $this = $(this);
      var targetModal = $this.attr(DATA_MODAL);

      $('.' + targetModal).addClass(ACTIVE);
      $body.addClass(OVERFLOW);
   });

   // modal close
   $modal_close.on('click', function() {
      var $this = $(this);
      var targetModal = $this.attr(DATA_MODAL);

      $('.' + targetModal).removeClass(ACTIVE);

      if($modal_bg.hasClass(ACTIVE)) {
         return;
      }

      $body.removeClass(OVERFLOW);
   });

});


