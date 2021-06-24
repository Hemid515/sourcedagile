 // Initiate venobox (lightbox feature used in portofilo)
 $(document).ready(function() {
	$('.venobox').venobox({
	  'share': false
	});
  });

 

$.fn.jQuerySimpleCounter = function( options ) {
	var settings = $.extend({
		start:  0,
		end:    100,
		easing: 'swing',
		duration: 400,
		complete: ''
	}, options );

	var thisElement = $(this);

	$({count: settings.start}).animate({count: settings.end}, {
		duration: settings.duration,
		easing: settings.easing,
		step: function() {
			var mathCount = Math.ceil(this.count);
			thisElement.text(mathCount);
		},
		complete: settings.complete
	});
};


$('#number1').jQuerySimpleCounter({end: 12,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246,duration: 2500});



  /* AUTHOR LINK */
 $('.about-me-img').hover(function(){
		$('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
	}, function(){
		$('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
	});



(function ($) {
	'use strict';

  // slide time interval
      $('#myCarousel').carousel({
    interval: 7000,
 });
      // Aos plugin
      AOS.init();

      // back to top
      $(window).scroll(function(){
    if($(this).scrollTop()>100){
      $(".back-to-top").fadeIn();
    }else{
      $(".back-to-top").fadeOut();
    }
  });
  $(".back-to-top").click(function(){
    $("html, body").animate({scrollTop:0},1000)
  })

	// Sticky Menu
	$(window).scroll(function () {
		var height = $('.top-header').innerHeight();
		if ($('header').offset().top > 10) {
			$('.top-header').addClass('hide');
			$('.navigation').addClass('nav-bg');
			$('.navigation').css('margin-top', '-' + height + 'px');
		} else {
			$('.top-header').removeClass('hide');
			$('.navigation').removeClass('nav-bg');
			$('.navigation').css('margin-top', '-' + 0 + 'px');
		}
	});

	//Hero Slider
	$('.hero-slider').slick({
		autoplay: true,
		autoplaySpeed: 7500,
		pauseOnFocus: false,
		pauseOnHover: false,
		infinite: true,
		arrows: true,
		fade: true,
		prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
		nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
		dots: true
	});
	$('.hero-slider').slickAnimation();

	 
 


 
})(jQuery);


