$(function(){

    $('.introduction__slider--body').slick({
        slidesToShow: 1,
        
        arrows: false,
        dots: true,
        dotsClass: 'header__slider--dots-list slider__dots-list',
        appendDots: '.introduction__slider--dots'
    });

    $('.header__burger').on('click', function() {
        $('.header__burger, .header__nav').toggleClass('active');
        $('body').toggleClass('lock');
        
    });

    function customeMediaEvents(e) {
        if($(e).width() > 992) {
            $('.header__burger, .header__nav').removeClass('active');
            $('body').removeClass('lock');
            $('.header__nav').removeClass('anim-effect');
        }
        else if ($(e).width() < 992) {
            setTimeout(function() {
                $('.header__nav').addClass('anim-effect');
            }, 200)
        }
    }

    $(window).resize(function() {
        customeMediaEvents(this);
    });

    customeMediaEvents(window);

    /* let heightIntroductionBlock = $('.introduction__info').height();
    console.log(heightIntroductionBlock);
    $('.introduction').css('padding-top', heightIntroductionBlock + 'px');
    console.log($('.introduction__body')); */

    function hHeader(settings) {
        
        if (settings == undefined) {
            return false;
        }
    
        if (settings.elemName == undefined) {
            return false;
        }
    
        if (settings.distance == undefined) {
            settings.distance = 500;
        }
    
        if (settings.fade == undefined) {
            settings.fade = false;
        }
    
        if (settings.speedAnim == undefined) {
            settings.speedAnim = 200;
        }

    
    
        let header = settings.elemName,
            distance = settings.distance,
            scrollPrev = 0, ifHeaderTopClass, ifHeaderTopDistance,
            scrollDown = distance,          
            distanceHide = settings.distanceHide,
            distanceShow = settings.distanceShow,
            scrolled = $(window).scrollTop(),
            scrollDownCheck = false,
            scrollTop = 0,
            scrollTopCheck = false,
            scrollToTop = false,
            scrollToDown = false,
            classAnchor = settings.classAnchor, classAnchorForTop = settings.classAnchorForTop;
            

            
        
        if(typeof distanceHide == 'number') {
            scrollDown = distanceHide;
        }        

        if(settings.ifHeaderTop != undefined) {
            ifHeaderTopClass = settings.ifHeaderTop[0];
            ifHeaderTopDistance = settings.ifHeaderTop[1];
        }
        

        function ifHeaderTop() {
            if(scrolled <= ifHeaderTopDistance && typeof ifHeaderTopClass == 'string') {
                $(header).addClass(ifHeaderTopClass);
                if(classAnchorForTop == true) {
                    $(header).addClass($('[data-hh-anchor]').data('hh-anchor'));
                    $.each($('[data-hh-anchor]'), function() {                            
                        $(this).addClass($('[data-hh-anchor]').data('hh-anchor'));
                    })
                }
            }
            else if (scrolled > ifHeaderTopDistance && typeof ifHeaderTopClass == 'string') {
                $(header).removeClass(ifHeaderTopClass);
                if(classAnchorForTop == true) {
                    $.each($('[data-hh-anchor]'), function() {                            
                        $(this).removeClass($('[data-hh-anchor]').data('hh-anchor'));
                    })
                }
            }
        }
        if(typeof ifHeaderTopClass == 'string') {
            ifHeaderTop();
            
        }

        $(window).scroll(function () {
            scrolled = $(window).scrollTop();          
            if (scrolled == 0) {
                if (settings.classToHide == undefined) {
                    if (settings.fade == true) {
                        $(header).fadeIn(settings.speedAnim);
                    }
                    else if (settings.fade == false) {
                        $(header).slideDown(settings.speedAnim);
                    }
                    
                }
                else {
                    $(header).removeClass(settings.classToHide);
                }
                scrollTopCheck = true;
            }
            
            if(typeof ifHeaderTopClass == 'string') {
                ifHeaderTop();
            }
    
            if (scrolled > 100 && scrolled > scrollPrev) {
                if (scrollToDown == false) {
                    scrollToTop = false;
                    
                    if(typeof distanceHide == 'number') {
                        scrollDown = scrolled + distanceHide;
                    }
                    else {
                        scrollDown = scrolled + distance;
                    }
                    scrollDownCheck = false;
                    scrollToDown = true;
                }
                
            } else if (scrollToTop == false) {
                
                    scrollToDown = false;
                    if(typeof distanceShow == 'number') {
                        scrollTop = scrolled - distanceShow;
                    }
                    else {
                        scrollTop = scrolled - distance;
                    }
                    scrollTopCheck = false;
                    scrollToTop = true;
                }
                
            scrollPrev = scrolled;
            if (scrolled >= scrollDown && scrollDownCheck == false) {
                // hide elem
                
                if (settings.classToHide == undefined) {
                    if (settings.fade == true) {
                        $(header).fadeOut(settings.speedAnim);
                    }
                    else if (settings.fade == false) {
                        $(header).slideUp(settings.speedAnim);
                    }
                    if(classAnchor == true) {
                        $.each($('[data-hh-anchor]'), function() {                            
                            $(this).addClass($('[data-hh-anchor]').data('hh-anchor'));
                        })
                    }
                }
                else {
                    $(header).addClass(settings.classToHide);
                    if(classAnchor == true) {
                        $.each($('[data-hh-anchor]'), function() {                            
                            $(this).addClass($('[data-hh-anchor]').data('hh-anchor'));
                        })
                    }
                }
                scrollDownCheck = true;
            }
            if (scrollTop >= scrolled && scrollTopCheck == false) {
                // show elem
                if (settings.classToHide == undefined) {
                    if (settings.fade == true) {
                        $(header).fadeIn(settings.speedAnim);
                    }
                    else if (settings.fade == false) {
                        $(header).slideDown(settings.speedAnim);
                    }
                    if(classAnchor == true) {
                        $.each($('[data-hh-anchor]'), function() {                            
                            $(this).removeClass($('[data-hh-anchor]').data('hh-anchor'));
                        })
                    }
                }
                else {
                    $(header).removeClass(settings.classToHide);
                    if(classAnchor == true) {
                        $.each($('[data-hh-anchor]'), function() {                            
                            $(this).removeClass($('[data-hh-anchor]').data('hh-anchor'));
                        })
                    }
                }
                scrollTopCheck = true;
            }
        });
    }
    
   

    hHeader({
        elemName: $('.header'),
        classToHide: 'hide',
        distanceHide: 200,
        distanceShow: 100,
        ifHeaderTop: ['top', 0],
        classAnchorForTop: true,
        
    });




});