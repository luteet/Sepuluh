$(function(){

    $('.introduction__slider--body').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
        infinite: false,
        dotsClass: 'header__slider--dots-list slider__dots-list',
        appendDots: '.introduction__slider--dots'
    });

    function lazyLoadImg(e) {
        
        $(e).attr('src', $(e).data('src')).removeAttr('data-src');
        $(e).prev('[data-srcset]').attr('srcset', $(e).prev('[data-srcset]').data('srcset')).removeAttr('data-srcset');
    }

    let imgLazy = $('.img-lazy-slider');
    imgLazy = imgLazy[0];
    $(imgLazy).attr('src', $(imgLazy).data('src')).removeAttr('data-src');
    $(imgLazy).prev('[data-srcset]').attr('srcset', $(imgLazy).prev('[data-srcset]').data('srcset')).removeAttr('data-srcset');
    $('.introduction__slider--body').on('afterChange', function(){
        imgLazy = $(this).find('.slick-active').find('.img-lazy-slider');
        if(!$(imgLazy).hasClass('loaded')) {
            lazyLoadImg(imgLazy);
        }
    });
    
    
    $('.form__input').focus(function() {
        $(this).next('.form__input--icon').addClass('active');
        
    }).blur(function() {
        $(this).next('.form__input--icon').removeClass('active');
    });

      $('.img-lazy-slider').on('load', function() {
        $(this).addClass('loaded').parents('.slider__item').find('.spinner').addClass('loaded').next('.slider__item--content').addClass('loaded');
      });
      $('.img-lazy').on('load', function() {
          if(!$(this).hasClass('.img-lazy-slider')) {
            $(this).addClass('loaded').parents('picture').next('.spinner').addClass('loaded')
            
          }
          
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


    function hHeader(settings) {

        let header = settings.elemName,
            distance = settings.distance,
            scrollPrev = 0,
            scrollDown = distance,          
            distanceHide = settings.distanceHide,
            distanceShow = settings.distanceShow,
            scrolled = $(window).scrollTop(),
            scrollDownCheck = false,
            scrollTop = 0,
            scrollTopCheck = false,
            scrollToTop = false,
            scrollToDown = false,
            ifHeaderTopClass = settings.ifHeaderTop[0],
            ifHeaderTopDistance = settings.ifHeaderTop[1];
        
        function ifHeaderTop() {
            if(scrolled <= ifHeaderTopDistance) {
                $(header).addClass(ifHeaderTopClass);
            }
            else if (scrolled > ifHeaderTopDistance) {
                $(header).removeClass(ifHeaderTopClass);
            }
        }
        ifHeaderTop();
        let lazyImgCheck;
        function imgLazyActive() {
            lazyImgCheck = $(header).offset().top + $(window).height() + 50;
            $.each($('.img-lazy'), function() {
                if(lazyImgCheck >= $(this).offset().top && !$(this).hasClass('img-lazy-slider') && !$(this).hasClass('loaded')) {
                    lazyLoadImg($(this));
                }
            });
        }
        imgLazyActive()
        $(window).scroll(function () {
            imgLazyActive();
            scrolled = $(window).scrollTop();          
            if (scrolled == 0) {
                $(header).removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
            ifHeaderTop();
            if (scrolled > 100 && scrolled > scrollPrev) {
                if (scrollToDown == false) {
                    scrollToTop = false;
                    scrollDown = scrolled + distanceHide;
                    scrollDownCheck = false;
                    scrollToDown = true;
                }
                
            } else if (scrollToTop == false) {
                    scrollToDown = false;
                    scrollTop = scrolled - distanceShow;
                    scrollTopCheck = false;
                    scrollToTop = true;
                }
                
            scrollPrev = scrolled;
            if (scrolled >= scrollDown && scrollDownCheck == false) {
                // hide elem
                $(header).addClass(settings.classToHide);
                scrollDownCheck = true;
            }
            if (scrollTop >= scrolled && scrollTopCheck == false) {
                // show elem
                $(header).removeClass(settings.classToHide);
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
   
    function formKeySwitch(settings) {
        
        let form_input = settings.formElem,
            inputChek = true,
            focusClass = settings.focusClass,
            inputLength = form_input.length - 1,
            inputLast = $(form_input[inputLength]).data('input-id'),
            inputId;

        function nextInput(e) {
            if (e.data('input-id') != inputLast && inputChek == true) {
                inputChek = false;
                inputId = e.data('input-id');
                inputId = inputId + 1;
                $('.form-elem[data-input-id|="' + inputId + '"]').focus();
                inputChek = true;
                setTimeout(function () {
                    inputChek = true;
                }, 250);
            }
        }
        function prevInput(e) {
            if (e.data('input-id') != 1 && inputChek == true) {
                inputChek = false;
                inputId = e.data('input-id');
                inputId = inputId - 1
                $('.form-elem[data-input-id|="' + inputId + '"]').focus();
                setTimeout(function () {
                    inputChek = true;
                }, 250);
            }
        }

        $(form_input).focus(function () {
            
            $(this).parent().addClass(focusClass);
            $(this).prev().addClass(focusClass);
            $(this).on('keydown', function (e) {
                if (e.which == 40) {
                    nextInput($(this));
                }
                if (e.which == 38) {
                    prevInput($(this));
                }
            });
        })
        .blur(function () {
            if ($(this).val() == '') {
                $(this).prev().removeClass(focusClass);
            }
            $(this).parent().removeClass(focusClass);
        });
    }
    
    formKeySwitch({

    formElem: $('.form-elem')

    });


    $('.footer__nav--btn').hover(function() {
        $(this).parent('li').next('li').children('.footer__nav--btn').addClass('hover-effect')
        $(this).parent('li').prev('li').children('.footer__nav--btn').addClass('hover-effect')
    },
    function() {
        $(this).parent('li').next('li').children('.footer__nav--btn').removeClass('hover-effect')
        $(this).parent('li').prev('li').children('.footer__nav--btn').removeClass('hover-effect')
    });

    AOS.init();

});