$(function() {
    var $window= $(window);
    var $html= $('html');
    var $body= $('body');
    var $wrap= $('#wrap');
    var $quickNav= $('#quickNav');
    var $header= $('#header');
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
    var active= 'active';
    var on = 'on';
    var overflow= 'overflow';
    var siteMap= 'siteMap';
    
    $html.on('click', function(e) {
        var target= $(e.target);
        var winWid= $window.width(); 

        if((target.attr('id') === 'wrap') && (target.hasClass(active))) {
            // site-map
            siteMapRemove();
            mobileDepthToggle();
        };
        // site map remove 
        if(target.hasClass('relateSite')) {
            familySiteRemove();
        }
        // total search popup
        if(target.hasClass('totalSearch_wrapper') || target.hasClass('totalSearch_close')) { 
            totalSearchClose();
        }

        // pad , mobile 
        if (winWid <= 1024) {
            // sub side menu close
            sideMenuClose();
        }

    });

    //top nav btn toggle opacity
        var scrollTimer= null;

        // scroll opacity toggle
        function topNavBtn() {
            var $window= $(this);
            var scTop= $window.scrollTop();

            if(scTop > 50) {
                $quickNav.addClass(active);
            } else {
                $quickNav.removeClass(active);
            };
            scrollTimer= null;
        }

        //scroll btn opacity toggle
        $window.on('scroll', function() {
            //scroll throttling 
            if(!scrollTimer)  {
                scrollTimer= setTimeout(topNavBtn, 200);
            };
            
        });

        // quick nav click
        $quickNav.on('click', function() {

            $('html, body').animate({
                scrollTop: 0,
            }, 500);

        });


    //header evnet
        //  desktop header
        function deskDepthOpen() {
            var winWid = $window.width();
            var targetHasClass = $menusWrap.hasClass(siteMap);
            if (winWid < 1024) return;
            if(targetHasClass) return;
            // if (winWid < 1024) $body.addClass(overflow);

            $header.addClass(active);
            $depthMenu.addClass(active);
        }; 
        function deskDepthClose() {
            var winWid = $window.width();
            var targetHasClass = $menusWrap.hasClass(siteMap);

            if (winWid < 1024) return;
            if(targetHasClass) return;

            $body.removeClass(overflow);
            $header.removeClass(active);
            $depthMenu.removeClass(active);
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
            .toggleClass(active)
            .siblings()
            .removeClass(active);

            return false;
        };

        $depth1_title.bind('click', mobileDepthToggle);

        //site-map
        function siteMapToggle() {
            if($body.hasClass(overflow)) {
                $body.removeClass(overflow);
            } else {
                $body.addClass(overflow);
            }
            $menusWrap.toggleClass(siteMap);
            $siteMapBtn.toggleClass(active);
            $wrap.toggleClass(active);

            return function() {
                console.log('return function');
                if ($siteMapBtn.hasClass(siteMap)) {
                    $()
                }
            };
        };

        function siteMapRemove() {
            $body.removeClass(overflow);
            $wrap.removeClass(active);
            $menusWrap.removeClass(siteMap);
            $siteMapBtn.removeClass(active);
        };

        $siteMapBtn.on('click', siteMapToggle);

    //total search popup
    function totalSearchOpen() {
        $body.addClass(overflow);
        $totalSearch_wrapper.addClass(active);    
    };
    function totalSearchClose() {
        $totalSearch_wrapper.removeClass(active);

        if(!$menusWrap.hasClass(siteMap)) {
            $body.removeClass(overflow);
        }

        return;
    };

    $searchBtn.on('click', totalSearchOpen);


    //sub layout
        // side menu 
        function sideMenuClose() {
            $('#subSideMenu').removeClass('overView');

            //side menu
                //depth1 close
                $SideMenu_depth1
                .parent('.SideMenu_depth1')
                .removeClass(on)
                .siblings()
                .removeClass(on);
                //depth2 close
                $SideMenu_depth2
                .parent('li')
                .removeClass(on)
                .siblings()
                .removeClass(on);
        };

        $SideMenu_depth1.on('click', function() {
            var winWid = $window.width();
            var $this= $(this);
            var depth2Has = $(this).siblings().hasClass('SideMenu_depth2');
            var $thisParent = $this.parent('.SideMenu_depth1');
            
            if(!depth2Has) return

            // desk top
            if (winWid > 1024 && $thisParent.hasClass(active)) {
                // preventDefault
                return false;
            } 
            
            // pad, mobile
            if($thisParent.hasClass(active)) {
                $('#subSideMenu').toggleClass('overView');

                $thisParent
                .toggleClass(on)
                .siblings()
                .toggleClass(on);

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

            if($thisParent.hasClass(active)) {
                $thisParent
                .toggleClass(on)
                .siblings()
                .toggleClass(on);

                // preventDefault
                return false;
            }

        });
        

    //footer family site
        
        function familySiteToggle() {
            $relateSite.toggleClass(active);
            $relateSite_title.toggleClass(active);

            $relateSite_title
            .siblings('.relateSite_list')
            .stop(true, true)
            .slideToggle();
        };
        

        function familySiteRemove() {
            $relateSite.removeClass(active);
            $relateSite_title.removeClass(active);

            $relateSite_title
            .siblings('.relateSite_list')
            .stop(true, true)
            .slideUp();
        };
        
        $relateSite.on('click', familySiteToggle);

});



